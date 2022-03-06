'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('donations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_name: {
        type: Sequelize.STRING
      },
      user_email: {
        type: Sequelize.STRING,
        unique: 'uniqueDonationCompetition'
      },
      competition_team_id: {
        type: Sequelize.INTEGER,
        references: { model: 'competition_teams', key: 'id'}
      },
      competition_id: {
        type: Sequelize.INTEGER,
        unique: 'uniqueDonationCompetition',
        references: { model: 'competitions', key: 'id'}
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, {
      uniqueKeys: {
        uniqueDonationCompetition: {
          fields: ['user_email', 'competition_id']
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('donations');
  }
};