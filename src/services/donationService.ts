import models from '../db/models'

export const registerDonation = async (
  competitionId: number,
  competitionTeamId: number,
  user_name: string,
  user_email: string
) => {
  return await models.sequelize.transaction(async (t) => {
    const createdDonation = await models.donation.create(
      {
        user_name: user_name,
        user_email: user_email,
        competitionTeamId: competitionTeamId,
        competitionId: competitionId,
      },
      { transaction: t }
    )
    await models.competitionTeam.increment('donation_count', {
      where: { id: competitionTeamId, competitionId: competitionId },
      transaction: t,
    })
    return createdDonation
  })
}
