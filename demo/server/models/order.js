'use strict';

module.exports = function(sequelize, DataTypes) {
	let Order = sequelize.define('Order', {
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		owner: {
			type: DataTypes.STRING,
			allowNull: false
		},
		total: {
			type: DataTypes.INTEGER,
		}
	});

	return Order;
};