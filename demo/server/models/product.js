'use strict';

module.exports = function(sequelize, DataTypes) {
	let Product = sequelize.define('Product', {
		title: {
			type: DataTypes.STRING,
			allowNull: false
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false
		},
		category: {
			type: DataTypes.ENUM,
			values: [
				'All',
				'Electronics',
				'Clothes',
				'Toys',
				'Accessories'
			],
			defaultValue: 'All'
		},
		price: {
			type: DataTypes.INTEGER,
		},
	});

	return Product;
};