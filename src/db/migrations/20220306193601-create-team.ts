import { QueryInterface, INTEGER, STRING, DATE } from 'sequelize'

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable(
      'teams',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: INTEGER,
        },
        name: {
          type: STRING,
          unique: 'institutionUniqueTeams',
        },
        institutionId: {
          type: INTEGER,
          unique: 'institutionUniqueTeams',
          references: { model: 'institutions', key: 'id' },
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
          institutionUniqueTeams: {
            fields: ['name', 'institutionId'],
          },
        },
      }
    )
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('teams')
  },
}
