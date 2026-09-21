'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Campaigns', 'priority', {
      type: Sequelize.STRING,
      defaultValue: 'normal',
      allowNull: false
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Campaigns', 'priority');
  }
};