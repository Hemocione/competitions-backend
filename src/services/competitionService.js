const {
  competition,
  sequelize,
  competitionTeam,
  team,
} = require('../db/models')

// status 2 = ativo, 1 = upcoming, 0 = finalizado
const statusCaseWhenClause = `
CASE
  WHEN CURRENT_TIMESTAMP > end_at THEN 0
  WHEN CURRENT_TIMESTAMP < start_at THEN 1
  ELSE 2
END`

const getCompetitions = async () => {
  const query = {
    attributes: [
      'id',
      'name',
      'start_at',
      'end_at',
      [sequelize.literal(statusCaseWhenClause), 'status'],
    ],
    order: [
      [sequelize.literal(statusCaseWhenClause), 'DESC'],
      ['start_at', 'ASC'],
    ],
  }

  return await competition.findAll(query)
}

const getCompetition = async (id) => {
  const query = {
    attributes: [
      'id',
      'name',
      [sequelize.literal(statusCaseWhenClause), 'status'],
    ],
    where: {
      id: id,
    },
  }

  return await competition.findOne(query)
}

const getCompetitionRanking = async (competitionId) => {
  const query = {
    attributes: ['id', 'donation_count'],
    where: {
      competitionId: competitionId,
    },
    include: {
      model: team,
      attributes: ['name', 'id'],
    },
    order: [['donation_count', 'desc']],
  }

  return await competitionTeam.findAll(query)
}

module.exports = { getCompetitions, getCompetition, getCompetitionRanking }
