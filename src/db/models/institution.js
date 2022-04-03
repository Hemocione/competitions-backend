'use strict';
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class institution extends Model {
    static associate(models) {
      this.hasMany(models.team)
    }

    static getRankingByCompetitionId(competitionId) {
      const id = parseInt(competitionId);
      if (!Number.isInteger(id))
        return [];

      const query = {
        attributes: {
          include: [
              [
                  sequelize.literal(`(SELECT SUM(donation_count) 
                                         FROM "competitionTeams" AS competition
                                         INNER JOIN teams AS team ON team.id = competition."teamId" AND institution.id = team."institutionId"
                                         WHERE competition."competitionId" = ${id})`
                  ), 'total_donations'
              ],
          ],
          exclude: [ 'createdAt', 'updatedAt'],
        },
        order: [
            [sequelize.literal('total_donations'), 'DESC']
        ]
      }

      return this.findAll(query);
    }
  }

  institution.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'institution',
  });

  return institution;
};