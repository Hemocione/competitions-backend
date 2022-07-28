import models from '../db/models'
import { FindOptions } from 'sequelize'
import {
  CompetitionAttributes,
  CompetitionTeamAttributes,
} from '../db/models/types'

// status 3 = draft, 2 = ativo, 1 = upcoming, 0 = finalizado
const statusCaseWhenClause = `
CASE
  WHEN NOT published AND publication_date IS NULL THEN 3
  WHEN CURRENT_TIMESTAMP > end_at THEN 0
  WHEN CURRENT_TIMESTAMP < start_at THEN 1
  ELSE 2
END`

export const getCompetitions = async (includeUnpublished = false) => {
  const query: FindOptions<CompetitionAttributes> = {
    attributes: [
      'id',
      'name',
      'start_at',
      'end_at',
      [models.sequelize.literal(statusCaseWhenClause), 'status'],
    ],
    order: [
      [models.sequelize.literal(statusCaseWhenClause), 'DESC'],
      ['start_at', 'ASC'],
    ],
  }

  if (!includeUnpublished) {
    query.where = {
      published: true
    }
  }

  return await models.competition.findAll(query)
}

export const getCompetition = async (id: number) => {
  const query: FindOptions<CompetitionAttributes> = {
    attributes: [
      'id',
      'name',
      [models.sequelize.literal(statusCaseWhenClause), 'status'],
    ],
    where: {
      id: id,
    },
  }

  return await models.competition.findOne(query)
}

export const getCompetitionRanking = async (competitionId: number) => {
  const query: FindOptions<CompetitionTeamAttributes> = {
    attributes: ['id', 'donation_count'],
    where: {
      competitionId: competitionId,
    },
    include: {
      model: models.team,
      attributes: ['name', 'id'],
    },
    order: [['donation_count', 'desc']],
  }

  return await models.competitionTeam.findAll(query)
}

export const createCompetition = async (
  name: string,
  startsAt: Date,
  endsAt: Date
) => {
  return await models.sequelize.transaction(async (t) => {
    return await models.competition.create(
      {
        name,
        start_at: startsAt,
        end_at: endsAt,
        published: false,
      },
      { transaction: t }
    )
  })
}

export const editCompetition = async (
  id: string,
  name: string,
  startsAt: Date,
  endsAt: Date
) => {
  return await models.sequelize.transaction(async (t) => {
    const competitionToEdit = await models.competition.findOne({
      where: { id },
    })
    if (!competitionToEdit) throw new Error('Competition not found')
    competitionToEdit.setAttributes({
      name,
      start_at: startsAt,
      end_at: endsAt,
    })
    return await competitionToEdit.save({ transaction: t })
  })
}

export const deleteCompetition = async (id: string) => {
  return await models.sequelize.transaction(async (t) => {
    return await models.competition.destroy({
      where: { id },
      transaction: t,
    })
  })
}
