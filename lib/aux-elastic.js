'use strict';
const bluebird = require('bluebird');
const elasticsearch = require('elasticsearch');
const _ = require('lodash');

class AuxElastic {
	constructor(host) {
		this.client = bluebird.promisifyAll(new elasticsearch.Client({host, log: 'trace'}));
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

	*stringSearch(index, string, fields) {
		let body = {
			query: {}
		};
		
		console.error('@stringSearch', string);
		if(string === '') {
			body.query.match_all = {};

			return yield this.client.searchAsync({
				index,
				body,
				_source: false
			});
		}

		if(!_.isUndefined(fields) && _.isArray(fields)) {
			body.query.multi_match = {
				query: string,
				fields
			}
		}
		else {
			body.query.match = {
				"_all": string
			}
		}

		return yield this.client.searchAsync({
			index,
			body,
			_source: false
		});
	}
}

module.exports = AuxElastic;