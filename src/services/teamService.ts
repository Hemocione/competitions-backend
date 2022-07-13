import models from '../db/models'
import { NotFoundError, Unexpected } from '../errors'

export const createTeam = async (name: string, institutionId: number) => {
  return await models.sequelize.transaction(async (t) => {
    const duplicatedTeam = await models.team.findOne({
      where: { institutionId, name },
    })
    if (duplicatedTeam)
      throw new Unexpected(`O nome '${name}' já está sendo utilizado`)

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
    const duplicatedTeam = await models.team.findOne({
      where: { institutionId, name },
    })
    if (duplicatedTeam)
      throw new Unexpected(`O nome '${name}' já está sendo utilizado`)

    const teamToEdit = await models.team.findOne({
      where: { id, institutionId },
    })
    if (!teamToEdit) throw new NotFoundError('Time não encontrado')

    teamToEdit.setAttributes({ name })
    return await teamToEdit.save({ transaction: t })
  })
}

export const deleteTeam = async (id: number, institutionId: number) => {
  return await models.sequelize.transaction(async (t) => {
    const deletedTeam = await models.team.destroy({
      where: { id, institutionId },
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
