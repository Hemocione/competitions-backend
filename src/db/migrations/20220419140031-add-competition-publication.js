'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
    return Promise.all([queryInterface.addColumn(
      'competitions',
      'published',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    ),
    queryInterface.addColumn(
      'competitions',
      'publication_date',
    {
      type: Sequelize.DATE,
      allowNull: true,
    })]);
  },

  down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('competitions', 'published'),
      queryInterface.removeColumn('competitions', 'publication_date'),
    ]);
  }
};
