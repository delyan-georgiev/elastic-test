'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Products',{
    	id: {
    		type: Sequelize.INTEGER,
			primaryKey: true,
			autoincrement: true
		},
		title: {
    		type: Sequelize.STRING,
			allowNull: false,
			defaultValue: ''
		},
		description: {
    		type: Sequelize.STRING,
			allowNull: false,
			defaultValue: ''
		},
		category: {
    		type: Sequelize.STRING,
			allowNull: false,
			defaultValue: 'All'
		},
		price: {
    		type: Sequelize.FLOAT,
			allowNull: false,
			defaultValue: 0
		}
	})
  },

  down: function (queryInterface, Sequelize) {
  	return queryInterface.dropTable('Products');
  }
};