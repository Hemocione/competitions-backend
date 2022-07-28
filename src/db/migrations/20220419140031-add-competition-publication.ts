import {BOOLEAN, DATE, QueryInterface} from 'sequelize'

export default {
  up (queryInterface: QueryInterface) {
    return Promise.all([queryInterface.addColumn(
      'competitions',
      'published',
      {
        type: BOOLEAN,
        defaultValue: false,
      },
    ),
    queryInterface.addColumn(
      'competitions',
      'publication_date',
    {
      type: DATE,
      allowNull: true,
    })]);
  },

  down (queryInterface: QueryInterface) {
    return Promise.all([
      queryInterface.removeColumn('competitions', 'published'),
      queryInterface.removeColumn('competitions', 'publication_date'),
    ]);
  }
};
