'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('competitionTeams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      donation_count: {
        type: Sequelize.INTEGER,
        default: 0
      },
      teamId: {
        type: Sequelize.INTEGER,
        unique: 'uniqueParticipant',
        references: { model: 'teams', key: 'id'}
      },
      competitionId: {
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
          fields: ['competitionId', 'teamId']
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('competitionTeams');
  }
};