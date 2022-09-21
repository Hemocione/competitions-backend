const { INTEGER, STRING, DATE } = require('sequelize')

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(
      'donations',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: INTEGER,
        },
        user_name: {
          type: STRING,
        },
        user_email: {
          type: STRING,
          unique: 'uniqueDonationCompetition',
        },
        competitionTeamId: {
          type: INTEGER,
          references: { model: 'competitionTeams', key: 'id' },
        },
        competitionId: {
          type: INTEGER,
          unique: 'uniqueDonationCompetition',
          references: { model: 'competitions', key: 'id' },
        },
        createdAt: {
          allowNull: false,
          type: DATE,
        },
        updatedAt: {
          allowNull: false,
          type: DATE,
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
  async down(queryInterface) {
    await queryInterface.dropTable('donations')
  },
}
