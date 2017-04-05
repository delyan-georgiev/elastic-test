'use strict';
const AuxElastic = require('./lib/aux-elastic');

module.exports = (host) => {
	return new AuxElastic(host);
};