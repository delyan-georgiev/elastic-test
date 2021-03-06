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
		}
	})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Orders');
  }
};
