const { BOOLEAN, DATE} = require('sequelize')

module.exports = {
  up (queryInterface) {
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

  down (queryInterface) {
    return Promise.all([
      queryInterface.removeColumn('competitions', 'published'),
      queryInterface.removeColumn('competitions', 'publication_date'),
    ]);
  }
};
