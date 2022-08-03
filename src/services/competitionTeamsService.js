const { getCompetitionRanking: getRankingByTeam } = require('./competitionService')
const { getRankingByCompetitionId: getRankingByInstitution } = require('./institutionService')

const getRanking = async (competitionId, by) => {
  if (by === 'institutions') {
    return await getRankingByInstitution(competitionId)
  }
  else {
    return await getRankingByTeam(competitionId)
  }
}

module.exports = { getRanking }
