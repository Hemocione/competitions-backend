'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class competition extends Model {
    static associate(models) {
      this.hasMany(models.competitionTeam, {
        foreignKey: 'competitionId'
      })

      this.hasMany(models.donation, {
        foreignKey: 'competitionId'
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