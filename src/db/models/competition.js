'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class competition extends Model {
    static associate(models) {
      this.hasMany(models.competition_team, {
        foreignKey: 'competition_id'
      })
    }
  }
  competition.init({
    name: DataTypes.STRING,
    start_at: DataTypes.DATE,
    end_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'competition',
  });
  return competition;
};