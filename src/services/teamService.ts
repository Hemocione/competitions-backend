import models from '../db/models'

export const createTeam = async (name: string, institutionId: number) => {
  return await models.sequelize.transaction(async (t) => {
    const createdTeam = await models.team.create(
      { name, institutionId },
      { transaction: t }
    )
    return createdTeam
  })
}

export const editTeam = async (
  name: string,
  id: number,
  institutionId: number
) => {
  return await models.sequelize.transaction(async (t) => {
    const teamToEdit = await models.team.findOne({
      where: { id, institutionId },
    })
    if (!teamToEdit) throw new Error('Team not found')

    teamToEdit.setAttributes({ name })
    return await teamToEdit.save({ transaction: t })
  })
}

export const deleteTeam = async (id: number) => {
  return await models.sequelize.transaction(async (t) => {
    const deletedTeam = await models.team.destroy({
      where: { id },
      transaction: t,
    })
    return deletedTeam
  })
}

export const assignTeamToCompetition = async (
  teamId: number,
  competitionId: number
) => {
  return await models.sequelize.transaction(async (t) => {
    const createdCompetitionTeam = await models.competitionTeam.create(
      { teamId, competitionId, donation_count: 0 },
      { transaction: t }
    )
    return createdCompetitionTeam
  })
}

export const unassignTeamFromCompetition = async (
  teamId: number,
  competitionId: number
) => {
  try {
    return await models.sequelize.transaction(async (t) => {
      const deletedCompetitionTeam = await models.competitionTeam.destroy({
        where: { teamId, competitionId },
        transaction: t,
      })

      return deletedCompetitionTeam
    })
  } catch (error) {
    console.log(error)
  }
}
