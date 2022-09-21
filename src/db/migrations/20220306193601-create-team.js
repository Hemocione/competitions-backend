const { INTEGER, STRING, DATE } = require('sequelize')

module.exports = {
  async up(queryInterface) {
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
  async down(queryInterface) {
    await queryInterface.dropTable('teams')
  },
}
