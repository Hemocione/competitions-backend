import { Request, Response, NextFunction } from 'express'

function contentType(req: Request, res: Response, next: NextFunction) {
  if (
    !(
      req.method === 'POST' ||
      req.method === 'PUT' ||
      req.method === 'PATCH'
    ) ||
    req.is('application/json') === 'application/json'
  ) {
    next()
  } else {
    res.status(400).json({ message: 'Content-Type Inválido' })
  }
}

export default contentType
