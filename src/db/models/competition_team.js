'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class competitionTeam extends Model {
    static associate(models) {
      this.belongsTo(models.team)

      this.belongsTo(models.competition)

      this.hasMany(models.donation)
    }
  }

  competitionTeam.init(
    {
      donation_count: DataTypes.INTEGER,
      teamId: DataTypes.INTEGER,
      competitionId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'competitionTeam',
    }
  )
  return competitionTeam
}
