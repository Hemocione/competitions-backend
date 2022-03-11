'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class team extends Model {
    static associate(models) {
      this.belongsTo(models.institution, {
        foreignKey: 'institutionId'
      })

      this.hasMany(models.competitionTeam, {
        foreignKey: 'teamId'
      })

      this.belongsToMany(models.competition, {
        through: models.competitionTeam
      })
    }
  }
  team.init({
    name: DataTypes.STRING,
    institutionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'team',
  });
  return team;
};