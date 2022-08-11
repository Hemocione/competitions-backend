const { competition, sequelize } = require('../db/models');

// status 3 = draft, 2 = ativo, 1 = upcoming, 0 = finalizado
const statusCaseWhenClause = `
CASE
  WHEN NOT published AND publication_date IS NULL THEN 3
  WHEN CURRENT_TIMESTAMP > end_at THEN 0
  WHEN CURRENT_TIMESTAMP < start_at THEN 1
  ELSE 2
END`


const getCompetitions = async (includeUnpublished=false) => {
  const query = {
    attributes: [
      'id', 'name', 'start_at', 'end_at', 'publication_date',
      [sequelize.literal(statusCaseWhenClause), 'status']
    ],
    order: [
      [sequelize.literal(statusCaseWhenClause), 'DESC'],
      ['start_at', 'ASC']
    ],
  }

  if (!includeUnpublished) {
    query.where = {
      published: true
    }
  }

  return (
    await competition.findAll(query)
  )
}

const getCompetition = async (id) => {
  const query = {
    attributes: [
      'id', 'name',
      [sequelize.literal(statusCaseWhenClause), 'status']
    ],
    where: {
      id: id
    }
  }

  return (
    await competition.findOne(query)
  )
}

const getCompetitionRanking = async (competitionId) => {
  const id = parseInt(competitionId)
  if (!Number.isInteger(id))
    return []

  const query = ` SELECT "teamId" as id, donation_count, teams.name FROM "competitionTeams"
                  LEFT JOIN teams ON "competitionTeams"."teamId" = teams.id
                  WHERE "competitionId" = $competitionId
                  ORDER BY donation_count desc`


  const result = await sequelize.query(query, {
    bind: {
      competitionId
    },
    type: sequelize.QueryTypes.SELECT
  })
  return result
}

module.exports = { getCompetitions, getCompetition, getCompetitionRanking }
