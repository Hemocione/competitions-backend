import { getCompetitionRanking as getRankingByTeam } from "./competitionService"
import { getRankingByCompetitionId as getRankingByInstitution } from "./institutionService"

export const getRanking = async (competitionId: number, by: any) => {
  if (by === 'institutions') {
    return await getRankingByInstitution(competitionId)
  } else {
    return await getRankingByTeam(competitionId)
  }
}
