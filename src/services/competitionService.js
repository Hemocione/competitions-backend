const { competition, sequelize, competitionTeam, team } = require('../db/models');

// status 2 = ativo, 1 = upcoming, 0 = finalizado
const statusCaseWhenClause = `
CASE
  WHEN CURRENT_TIMESTAMP > end_at THEN 0
  WHEN CURRENT_TIMESTAMP < start_at THEN 1
  ELSE 2
END`


const getCompetitions = async () => {
  return (
    await competition.findAll({
      attributes: [
        'id', 'name', 'start_at', 'end_at',
        [sequelize.literal(statusCaseWhenClause), 'status']
      ],
      order: [
        [sequelize.literal(statusCaseWhenClause), 'DESC'],
        ['start_at', 'ASC']
      ]
    })
  )
}

const getCompetition = async (id) => {
  return (
    await competition.findOne({
      attributes: [
        'id', 'name',
        [sequelize.literal(statusCaseWhenClause), 'status']
      ],
      where: { 
        id: id
      },
      include: [
        {
          model: competitionTeam,
          attributes: ['donation_count'],
          include: [
            {
              model: team,
              attributes: ['name']
            }
          ],
        }
      ],
      order: [
        [{ model: competitionTeam }, 'donation_count', 'desc']
      ]
    })
  )
}

module.exports = { getCompetitions, getCompetition }
