'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class team extends Model {
    static associate(models) {
      this.belongsTo(models.institution, {
        foreignKey: 'institution_id'
      })

      this.hasMany(models.competition_team, {
        foreignKey: 'team_id'
      })

      this.hasMany(model.donation, {
        through: models.competition_team
      })
    }
  }
  team.init({
    name: DataTypes.STRING,
    institution_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'team',
  });
  return team;
};