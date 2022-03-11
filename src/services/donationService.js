const { donation, competitionTeam, sequelize } = require('../db/models');

const registerDonation = async (competitionId, competitionTeamId, user_name, user_email) => {
  return (
    await sequelize.transaction(async (t) => {
      const createdDonation = await donation.create({
        user_name: user_name, user_email: user_email, competitionTeamId: competitionTeamId, competitionId: competitionId
      }, {transaction: t})
      await competitionTeam.increment(['donation_count'], { where: { id: competitionTeamId }}, {transaction: t})
      return createdDonation
    })
  )
}

module.exports = { registerDonation }
