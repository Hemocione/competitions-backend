import { Response, NextFunction } from 'express'
import { CompetitionsRequest } from '../types'
import { Unauthorized } from '../errors'
import HemocioneAPI from '../services/HemocioneAPI'

export default async function auth(
  req: CompetitionsRequest,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers
  if (!authorization) {
    return next(new Unauthorized('Token inválido'))
  }

  try {
    const user = await HemocioneAPI.validateToken(authorization)
    req.user = user
  } catch (error) {
    return next(error)
  }
  return next()
}
