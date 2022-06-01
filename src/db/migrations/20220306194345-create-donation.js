'use strict'
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'donations',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        user_name: {
          type: Sequelize.STRING,
        },
        user_email: {
          type: Sequelize.STRING,
          unique: 'uniqueDonationCompetition',
        },
        competitionTeamId: {
          type: Sequelize.INTEGER,
          references: { model: 'competitionTeams', key: 'id' },
        },
        competitionId: {
          type: Sequelize.INTEGER,
          unique: 'uniqueDonationCompetition',
          references: { model: 'competitions', key: 'id' },
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {
        uniqueKeys: {
          uniqueDonationCompetition: {
            fields: ['user_email', 'competitionId'],
          },
        },
      }
    )
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('donations')
  },
}
