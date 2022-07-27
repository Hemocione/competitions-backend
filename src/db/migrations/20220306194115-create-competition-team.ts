import { QueryInterface, INTEGER, DATE } from 'sequelize'

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable(
      'competitionTeams',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: INTEGER,
        },
        donation_count: {
          type: INTEGER,
          defaultValue: 0,
        },
        teamId: {
          type: INTEGER,
          unique: 'uniqueParticipant',
          references: { model: 'teams', key: 'id' },
        },
        competitionId: {
          type: INTEGER,
          unique: 'uniqueParticipant',
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
          uniqueParticipant: {
            fields: ['competitionId', 'teamId'],
          },
        },
      }
    )
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('competitionTeams')
  },
}
