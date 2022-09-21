const { INTEGER, STRING, DATE } = require('sequelize')

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('institutions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: INTEGER,
      },
      name: {
        type: STRING,
        unique: true,
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
    await queryInterface.dropTable('institutions')
  },
}
