'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addIndex('competitions', ['start_at']);
    await queryInterface.addIndex('competitions', ['end_at'])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeIndex('competitions', ['start_at']);
    await queryInterface.removeIndex('competitions', ['end_at'])
  }
};
