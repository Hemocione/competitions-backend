'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class donation extends Model {
    static associate(models) {
      this.belongsTo(models.competition_team, {
        foreignKey: 'competition_team_id',
      })
    }
  }
  donation.init({
    user_name: DataTypes.STRING,
    user_email: DataTypes.STRING,
    competition_team_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'donation',
  });
  return donation;
};