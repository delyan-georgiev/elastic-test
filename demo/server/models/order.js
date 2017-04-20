'use strict';

module.exports = function(sequelize, DataTypes) {
	let Order = sequelize.define('Order', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		createdAt: {
			type: DataTypes.DATE
		},
		updatedAt: {
			type: DataTypes.DATE
		}
	}, {
		classMethods: {
			associate: function() {
				this.hasMany(sequelize.models.Product);
			}
		}
	});

	return Order;
};