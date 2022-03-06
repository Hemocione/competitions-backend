'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('competition_teams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      donation_count: {
        type: Sequelize.INTEGER
      },
      team_id: {
        type: Sequelize.INTEGER
      },
      competition_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('competition_teams');
  }
};