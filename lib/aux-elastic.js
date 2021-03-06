'use strict';
// custom analyzers (done => customAnalyzer)

// dive deep in filters to find mouse if search for mice (synonym token filter)
/*
ADD custom filter to analyzer filters array
then define this filter with
 filter: {
 synonym: {
 type: "synonym",
 synonyms: [
 "i-pod, i pod => ipod",
 "universe, cosmos",
 "mouse, mice"
 ]
 }
 }
* */

// relational types
/*PUT search
 {
 mappings: {
 orders: {},
 products: {
 _parent: {
 type: "orders"
 }
 }
 }
 }

 POST search/order/_search
 {
 query: {
 has_child: {
 type: "products",
 query: {
 match: {
 title: "product title"
 }
 }
 }
 }
 }
 */
const bluebird = require('bluebird');
const elasticsearch = require('elasticsearch');
const _ = require('lodash');
const co = require('co');

const customAnalyzer = {
	settings: {
		analysis: {
			analyzer: {
				aux_products_analyzer: {
					type: "custom",
					tokenizer: "ngram",
					filter: [
						"lowercase",
						"asciifolding",
						"synonym"
					]
				}
			},
			filter: {
				synonym: {
					type: "synonym",
					synonyms_path: "analysis/synonyms.txt"
				}
			}
		}
	},
	mappings: {
		products: {
			properties: {
				title: {
					type: "text",
					analyzer: "aux_products_analyzer"
				},
				description: {
					type: "text",
					analyzer: "english"
				}
			}
		}
	}
};
const searchIndexConfig = {
	settings: {
		analysis: {
			filter: {
				english_stemmer: {
					type: "stemmer",
					language: "english"
				},
				english_possessive_stemmer: {
					type: "stemmer",
					language: "possessive_english"
				},
				english_porter_stemmer: {
					type: 'stemmer',
					language: 'porter2'
				}
			},
			analyser: {
				english2: {
					tokenizer: "standard",
					filter: [
						"english_possessive_stemmer",
						"lowercase",
						"english_stemmer",
						"english_porter_stemmer"
					]
				}
			}
		}
	},
	mappings: {
		products: {
			properties: {
				title: {
					type: "text",
					analyzer: "english",
					boost: 3
				},
				description: {
					type: "text",
					analyzer: "english",
					search_analyzer: "english"
				},
				category: {
					type: "keyword",
					boost: 2
				},
				price: {
					type: "text",
					analyzer: "english",
					search_analyzer: "english"
				}
			}
		}
	}
}

class AuxElastic {
	constructor(host) {
		const self = this;
		this.client = bluebird.promisifyAll(new elasticsearch.Client({host, log: 'trace'}));

		co(function*() {
			yield self.initIndex('search', hunspellAnalyzer);
		});
	}

	*initIndex(index, configObj) {
		console.error(index);
		let hasIndex = yield this.client.indices.exists({index});
		console.error(hasIndex);
		if(!hasIndex) {
			yield this.client.indices.create({
				index: index,
				body: configObj
			})
		}
	}

	testElastic() {
		this.client.ping({
			requestTimeout: 30000,
		}, function(error) {
			if(error) {
				console.error('elasticsearch cluster is down!');
			}
			else {
				console.log('All is well');
			}
		});
	};

	*create(index, type, id, body) {
		return yield this.client.createAsync({
			index: index,
			type: type,
			id: id,
			body: body
		});
	};

	*update(index, type, id, body) {
		return yield this.client.update({
			index,
			type,
			id,
			body: {
				doc: body
			}
		})
	}

	*remove(index, type, id) {
		console.error('@remove', index, type, id);
		return yield this.client.delete({index, type, id});
	}

	*search(index, search, fields) {
		let string = search.queryString;
		let category = search.category;
		let body = {
			query: {
				bool: {
					must: []
				}
			}
		};

		if(category !== '') {
			body.query.bool.must.push({
				match: {
					category
				}
			});
		}

		if(string === '') {
			return yield this.client.searchAsync({
				index,
				body,
				_source: false
			});
		}

		if(_.isUndefined(fields) || !_.isArray(fields)) {
			fields = '_all';
		}

		body.query.bool.must.push({
			multi_match: {
				query: string,
				fields
			}
		});

		return yield this.client.searchAsync({
			index,
			body,
			_source: false
		});
	}
}

module.exports = AuxElastic;