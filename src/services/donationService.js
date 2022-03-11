const { donation, competitionTeam, sequelize } = require('../db/models');

const registerDonation = async (competitionId, competitionTeamId, user_name, user_email) => {
  console.log('lau')
  return (
    await sequelize.transaction(async (t) => {
      console.log('cheguei')
      const createdDonation = await donation.create({
        user_name: user_name, user_email: user_email, competitionTeamId: competitionTeamId, competitionId: competitionId
      }, {transaction: t})
      await competitionTeam.increment(['donation_count', '1'], { where: { id: competitionTeamId }}, {transaction: t})
      console.log('cheguei 2')
      return createdDonation
    })
  )
}

module.exports = { registerDonation }
