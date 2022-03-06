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
        type: Sequelize.INTEGER,
      },
      team_id: {
        type: Sequelize.INTEGER,
        unique: 'uniqueParticipant',
        references: { model: 'teams', key: 'id'}
      },
      competition_id: {
        type: Sequelize.INTEGER,
        unique: 'uniqueParticipant',
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
        uniqueParticipant: {
          fields: ['competition_id', 'team_id']
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('competition_teams');
  }
};