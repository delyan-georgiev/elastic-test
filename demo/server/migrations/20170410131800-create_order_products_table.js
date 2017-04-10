'use strict';

module.exports = {
	up: function(queryInterface, Sequelize) {
		return queryInterface.createTable('OrderProducts', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			OrderId: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			ProductId: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			amount: {
				type: Sequelize.INTEGER,
				allowNull: false
			}
		});
	},

	down: function(queryInterface, Sequelize) {
		return queryInterface.dropTable('OrderProducts');
	}
};
