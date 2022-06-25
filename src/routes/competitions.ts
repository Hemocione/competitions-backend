import express from 'express'
import { getRankingByCompetitionId } from '../services/institutionService'
import {
  createCompetition,
  editCompetition,
  deleteCompetition,
} from '../services/competitionService'
import errors from '../errors'
import {
  assignTeamToCompetition,
  unassignTeamFromCompetition,
} from '../services/teamService'

const router = express.Router()

router.get('/competitions/:id/rankings', async (req, res, next) => {
  const id = parseInt(req.params.id)
  if (!Number.isInteger(id))
    return next(new errors.NotFoundError('Competition not Found!'))

  const result = await getRankingByCompetitionId(id)
  res.status(200).json(result)
})

router.post('/competitions', async (req, res, next) => {
  const { name, startsAt, endsAt } = req.body

  if (!name || !startsAt || !endsAt)
    return next(new errors.Unexpected('Bad Request!'))

  const result = await createCompetition(name, startsAt, endsAt)

  res.status(200).json(result)
})

router.post(
  '/competitions/:competitionId/assign/:teamId',
  async (req, res, next) => {
    const teamId = parseInt(req.params.teamId)
    const competitionId = parseInt(req.params.competitionId)

    if (!teamId || !competitionId)
      return next(new errors.Unexpected('Bad Request!'))

    if (!Number.isInteger(teamId) || !Number.isInteger(competitionId))
      return next(new errors.NotFoundError('Bad Request!'))

    const result = await assignTeamToCompetition(teamId, competitionId)

    res.status(200).json(result)
  }
)

router.delete(
  '/competitions/:competitionId/assign/:teamId',
  async (req, res, next) => {
    try {
      const teamId = parseInt(req.params.teamId)
      const competitionId = parseInt(req.params.competitionId)

      if (!teamId || !competitionId)
        return next(new errors.Unexpected('Bad Request!'))

      if (!Number.isInteger(teamId) || !Number.isInteger(competitionId))
        return next(new errors.NotFoundError('Bad Request!'))

      const result = await unassignTeamFromCompetition(teamId, competitionId)

      res.status(200).json(result)
    } catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
  }
)

router.put('/competitions/:id', async (req, res, next) => {
  const { id } = req.params
  const { name, startsAt, endsAt } = req.body

  if (!name || !startsAt || !endsAt)
    return next(new errors.Unexpected('Bad Request!'))

  const result = await editCompetition(id, name, startsAt, endsAt)

  res.status(200).json(result)
})

router.delete('/competitions/:id', async (req, res, next) => {
  const { id } = req.params

  const result = await deleteCompetition(id)

  res.status(200).json(result)
})

export default { url: '/v1', router }
