'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class competition extends Model {
    static associate(models) {
      this.hasMany(models.competitionTeam)

      this.hasMany(models.donation)
    }
  }
  competition.init(
    {
      name: DataTypes.STRING,
      start_at: DataTypes.DATE,
      end_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'competition',
    }
  )
  return competition
}
