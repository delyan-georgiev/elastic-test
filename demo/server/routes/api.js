const express = require('express');
const co = require('co');
const _ = require('lodash');

const elastic = require('../../../index')('localhost:9200');// elastic server
const sequelize = require('../lib/db').sequelize;
const db = require('../models');

const router = express.Router();

/* GET api listing. */
router.get('/', (req, res) => {
	res.send('api works');
});

router.post('/add', co.wrap(function*(req, res, next) {
	let productData = req.body;
	let product = yield db.Product.create(productData);
	yield elastic.create('auction', 'regular', product.id, productData);
}));

router.post('/search', co.wrap(function*(req, res, next) {
	// let ids = [];
	let products = [];
	/*optional: fields:[] if not provided will search in all fields*/
	let elasticResult = yield elastic.stringSearch('auction', req.body.search);
	if(elasticResult.hits.total > 0) {
		let ids = _.map(elasticResult.hits.hits, (h)=>h._id);
		products = yield db.Product.findAll({where: {id: {$in: ids}}});

		console.error(elasticResult.hits);
	}

	res.jsonp(products);
}));

router.get('/getAll', co.wrap(function*(req, res, next) {
	let products = yield db.Product.findAll();

	res.jsonp(products);
}));

router.post('/edit', co.wrap(function*(req, res, next) {
	console.error('@roter edit');
	let product = req.body;

	let response = yield elastic.update('auction', 'regular', product.id, product);
	console.error(response);
	let productRecord = yield db.Product.findById(product.id);
	_.extend(productRecord, product);
	yield productRecord.save();

	res.jsonp(true);
}));

module.exports = router;