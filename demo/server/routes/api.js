const express = require('express');
const router = express.Router();
const db = require('../lib/db');

/* GET api listing. */
router.get('/', (req, res) => {
	res.send('api works');
});

router.get('/test', (req, res) => {

});

module.exports = router;