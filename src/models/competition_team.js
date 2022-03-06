'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class competition_team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.team, {
        foreignKey: 'team_id'
      })

      this.belongsTo(models.competition, {
        foreignKey: 'competition_id'
      })

      this.hasMany(models.donation, {
        foreignKey: 'competition_team_id'
      })
    }
  }

  competition_team.init({
    donation_count: DataTypes.INTEGER,
    team_id: DataTypes.INTEGER,
    competition_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'competition_team',
  });
  return competition_team;
};