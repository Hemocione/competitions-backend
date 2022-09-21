const { institution } = require("../db/models");


const getRankingByCompetitionId = async (competitionId) => {
    return await institution.getRankingByCompetitionId(competitionId);
}

module.exports = { getRankingByCompetitionId }