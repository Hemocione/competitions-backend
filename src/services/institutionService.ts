import models from '../db/models'

export const getRankingByCompetitionId = async (competitionId: number) => {
  return await models.institution.getRankingByCompetitionId(competitionId)
}

export const createInstitution = async (name: string) => {
  return await models.sequelize.transaction(async (t) => {
    const createdInstitution = await models.institution.create(
      { name },
      { transaction: t }
    )
    return createdInstitution
  })
}

export const editInstitution = async (id: string, name: string) => {
  return await models.sequelize.transaction(async (t) => {
    const institutionToEdit = await models.institution.findOne({
      where: { id },
    })
    if (!institutionToEdit) throw new Error('Institution not found')
    institutionToEdit.setAttributes({ name })
    return await institutionToEdit.save({ transaction: t })
  })
}

export const deleteInstitution = async (id: string) => {
  return await models.sequelize.transaction(async (t) => {
    const deletedInstitution = await models.institution.destroy({
      where: { id },
      transaction: t,
    })
    return deletedInstitution
  })
}
