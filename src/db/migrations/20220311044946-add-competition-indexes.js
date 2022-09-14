module.exports = {
  async up(queryInterface) {
    await queryInterface.addIndex('competitions', ['start_at'])
    await queryInterface.addIndex('competitions', ['end_at'])
  },

  async down(queryInterface) {
    await queryInterface.removeIndex('competitions', ['start_at'])
    await queryInterface.removeIndex('competitions', ['end_at'])
  },
}
