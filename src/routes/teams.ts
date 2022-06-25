import express from 'express'
import { createTeam, editTeam, deleteTeam } from '../services/teamService'
import errors from '../errors'
const router = express.Router()

router.post('/teams', async (req, res, next) => {
  const { name } = req.body

  const institutionId = parseInt(req.body.institutionId)

  if (!name) return next(new errors.Unexpected('Bad Request!'))

  const result = await createTeam(name, institutionId)

  res.status(200).json(result)
})

router.put('/teams/:id', async (req, res, next) => {
  const { id } = req.params
  const { name } = req.body
  const institutionId = parseInt(req.body.institutionId)

  if (!name) return next(new errors.Unexpected('Bad Request!'))

  const result = await editTeam(id, name, institutionId)

  res.status(200).json(result)
})

router.delete('/teams/:id', async (req, res, next) => {
  const id = parseInt(req.params.id)

  const result = await deleteTeam(id)

  res.status(200).json(result)
})

export default { url: '/v1', router }
