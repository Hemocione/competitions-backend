import { QueryInterface } from 'sequelize'

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.addIndex('competitions', ['start_at'])
    await queryInterface.addIndex('competitions', ['end_at'])
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeIndex('competitions', ['start_at'])
    await queryInterface.removeIndex('competitions', ['end_at'])
  },
}
