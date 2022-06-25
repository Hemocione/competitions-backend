import { Request, Response, NextFunction } from 'express'

import HemocioneAPI from '../helpers/HemocioneAPI'

async function validateSession(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers
  if (!authorization) {
    return res.status(401).json({ message: 'Não autorizado' })
  }

  try {
    await HemocioneAPI.validateToken(authorization)
  } catch (error) {
    return next(error)
  }
  return next()
}
