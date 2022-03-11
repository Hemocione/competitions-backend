'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class donation extends Model {
    static associate(models) {
      this.belongsTo(models.competitionTeam, {
        foreignKey: 'competitionTeamId',
      })

      this.belongsTo(models.team, {
        through: models.competitionTeam
      })

      this.belongsTo(models.competition, {
        through: models.competitionTeam
      })
    }
  }
  donation.init({
    user_name: DataTypes.STRING,
    user_email: DataTypes.STRING,
    competitionTeamId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'donation',
  });
  return donation;
};