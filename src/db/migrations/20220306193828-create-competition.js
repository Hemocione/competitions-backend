const { INTEGER, STRING, DATE } = require('sequelize')

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('competitions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: INTEGER,
      },
      name: {
        type: STRING,
      },
      start_at: {
        type: DATE,
      },
      end_at: {
        type: DATE,
      },
      createdAt: {
        allowNull: false,
        type: DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DATE,
      },
    })
  },
  async down(queryInterface) {
    await queryInterface.dropTable('competitions')
  },
}
