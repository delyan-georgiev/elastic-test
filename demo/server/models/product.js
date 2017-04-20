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
		OrderId: {
			type: DataTypes.INTEGER,
			references: {
				model: 'Order',
				key: 'id'
			}
		}
	}, {
		classMethods: {
			associate: function() {
				this.belongsTo(sequelize.models.Order);
			}
		}
	});

	return Product;
};