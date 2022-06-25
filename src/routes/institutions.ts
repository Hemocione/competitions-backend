import express from 'express'
import {
  createInstitution,
  editInstitution,
  deleteInstitution,
} from '../services/institutionService'
import { createTeam, editTeam, deleteTeam } from '../services/teamService'
import errors from '../errors'
const router = express.Router()

router.post('/institutions', async (req, res, next) => {
  const { name } = req.body

  if (!name) return next(new errors.Unexpected('Bad Request!'))

  const result = await createInstitution(name)

  res.status(200).json(result)
})

router.put('/institutions/:id', async (req, res, next) => {
  const { id } = req.params
  const { name } = req.body

  if (!name) return next(new errors.Unexpected('Bad Request!'))

  const result = await editInstitution(id, name)

  res.status(200).json(result)
})

router.delete('/institutions/:id', async (req, res, next) => {
  const { id } = req.params

  const result = await deleteInstitution(id)

  res.status(200).json(result)
})

router.post('/institutions/:institutionId/teams', async (req, res, next) => {
  const { name } = req.body
  const institutionId = parseInt(req.params.institutionId)

  if (!institutionId || !Number.isInteger(institutionId))
    return next(new errors.Unexpected('Bad Request!'))

  if (!name) return next(new errors.Unexpected('Bad Request!'))

  const result = await createTeam(name, institutionId)

  res.status(200).json(result)
})

router.put(
  '/institutions/:institutionId/teams/:teamId',
  async (req, res, next) => {
    const { name } = req.body
    const institutionId = parseInt(req.params.institutionId)
    const teamId = parseInt(req.params.teamId)

    if (!institutionId || !Number.isInteger(institutionId))
      return next(new errors.Unexpected('Bad Request!'))

    if (!teamId || !Number.isInteger(teamId))
      return next(new errors.Unexpected('Bad Request!'))

    if (!name) return next(new errors.Unexpected('Bad Request!'))

    const result = await editTeam(name, teamId, institutionId)

    res.status(200).json(result)
  }
)

router.delete(
  '/institutions/:institutionId/teams/:teamId',
  async (req, res, next) => {
    const teamId = parseInt(req.params.teamId)

    if (!teamId || !Number.isInteger(teamId))
      return next(new errors.Unexpected('Bad Request!'))

    const result = await deleteTeam(teamId)

    res.status(200).json(result)
  }
)

export default { url: '/v1', router }
