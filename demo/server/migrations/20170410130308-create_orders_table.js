'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Orders', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false
		},
		owner: {
			type: Sequelize.STRING,
			allowNull: false
		},
		total: {
			type: Sequelize.INTEGER,
		}
	})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Orders');
  }
};
