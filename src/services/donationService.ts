import models from '../db/models'

export const registerDonation = async (
  competitionId: number,
  competitionTeamId: number,
  user_name: string,
  user_email: string
) => {
  return await models.sequelize.transaction(async (t) => {
    const competitionTeam = await models.competitionTeam.findOne({
      where: {
        teamId: competitionTeamId,
        competitionId
      },
      transaction: t
    })
    if (!competitionTeam) throw new Error('CompetitionTeam not found')

    const createdDonation = await models.donation.create(
      {
        user_name: user_name,
        user_email: user_email,
        competitionTeamId: competitionTeam.id,
        competitionId: competitionId,
      },
      { transaction: t }
    )
    await models.competitionTeam.increment('donation_count', {
      where: { id: competitionTeam.id, competitionId: competitionId },
      transaction: t,
    })
    return createdDonation
  })
}
