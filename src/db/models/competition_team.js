'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class competitionTeam extends Model {
    static associate(models) {
      this.belongsTo(models.team, {
        foreignKey: 'teamId'
      })

      this.belongsTo(models.competition, {
        foreignKey: 'competitionId'
      })

      this.hasMany(models.donation, {
        foreignKey: 'competitionTeamId'
      })
    }
  }

  competitionTeam.init({
    donation_count: DataTypes.INTEGER,
    teamId: DataTypes.INTEGER,
    competitionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'competitionTeam',
  });
  return competitionTeam;
};