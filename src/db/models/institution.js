'use strict';
const {
  Model,
  QueryTypes
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

      const query = ` SELECT CAST(sum(donation_count) as int) AS donation_count,
                      teams."institutionId" AS id,
                      MAX(institutions.name) AS name FROM "competitionTeams"
                      LEFT JOIN teams ON "competitionTeams"."teamId" = "teams".id
                      LEFT JOIN institutions ON teams."institutionId" = institutions.id
                      WHERE "competitionId" = ${competitionId}
                      GROUP BY teams."institutionId"
                      ORDER BY donation_count desc`

      const result = sequelize.query(query, {
        bind: {
          competitionId: id
        },
        type: QueryTypes.SELECT
      })
      return result
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
