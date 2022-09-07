import express from 'express'
import  { getRanking }  from '../services/competitionTeamsService'
import {
  createCompetition,
  editCompetition,
  deleteCompetition,
} from '../services/competitionService'
import { Unexpected, NotFoundError } from '../errors'
import {
  assignTeamToCompetition,
  unassignTeamFromCompetition,
} from '../services/teamService'
import funcWrapper from '../helpers/funcWrapper'
import { Context } from '../types'
import auth from '../middlewares/auth'
import validateRoles from '../middlewares/validateRoles'

const router = express.Router()

router.get(
  '/competitions/:id/rankings',
  funcWrapper(async (context: Context) => {
    const id = parseInt(context.req.params.id)
    const { by } = context.req.query
    if (!Number.isInteger(id)) throw new NotFoundError('Competition not Found!')

    const result = await getRanking(id, by)
    return result
  })
)

router.post(
  '/competitions',
  auth,
  validateRoles(['admin']),
  funcWrapper(async (context) => {
    const { name, startsAt, endsAt } = context.req.body

    if (!name || !startsAt || !endsAt) throw new Unexpected('Bad Request!')

    const result = await createCompetition(name, startsAt, endsAt)

    return result
  })
)

router.post(
  '/competitions/:competitionId/assign/:teamId',
  auth,
  validateRoles(['admin']),
  funcWrapper(async (context) => {
    const params = context.req.params
    const teamId = parseInt(params.teamId)
    const competitionId = parseInt(params.competitionId)

    if (!teamId || !competitionId) throw new Unexpected('Bad Request!')

    if (!Number.isInteger(teamId) || !Number.isInteger(competitionId))
      throw new NotFoundError('Bad Request!')

    const result = await assignTeamToCompetition(teamId, competitionId)

    return result
  })
)

router.delete(
  '/competitions/:competitionId/assign/:teamId',
  auth,
  validateRoles(['admin']),
  funcWrapper(async (context) => {
    const params = context.req.params
    const teamId = parseInt(params.teamId)
    const competitionId = parseInt(params.competitionId)

    if (!teamId || !competitionId) throw new Unexpected('Bad Request!')

    if (!Number.isInteger(teamId) || !Number.isInteger(competitionId))
      throw new NotFoundError('Bad Request!')

    const result = await unassignTeamFromCompetition(teamId, competitionId)
    return result
  })
)

router.put(
  '/competitions/:id',
  auth,
  validateRoles(['admin']),
  funcWrapper(async (context) => {
    const { id } = context.req.params
    const { name, startsAt, endsAt } = context.req.body

    if (!name || !startsAt || !endsAt) throw new Unexpected('Bad Request!')

    const result = await editCompetition(id, name, startsAt, endsAt)

    return result
  })
)

router.delete(
  '/competitions/:id',
  auth,
  validateRoles(['admin']),
  funcWrapper(async (context) => {
    const { id } = context.req.params

    const result = await deleteCompetition(id)

    return result
  })
)

export default { url: '/v1', router }
