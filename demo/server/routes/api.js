const express = require('express');
const router = express.Router();
const sequelize = require('../lib/db').sequelize;
const db = require('../models');

/* GET api listing. */
router.get('/', (req, res) => {
	res.send('api works');
});

router.post('/products', (req, res) => {
	let product = db.Product.create(req.body);
	// let data = db.sequelize.Product.findAll();
	console.error(req.body);
	res.jsonp({asd:'asd'});
});

module.exports = router;