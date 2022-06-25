import { Request, Response, NextFunction } from 'express'

export function errorsMiddleware(
  err: any,
  req: Request,
  res: Response,
  _: any
) {
  res.header('Content-Type', 'application/json')
  res.status(err.statusCode || 500).send(JSON.stringify(err, null, 4)) // pretty print
}

export function notFoundRoute(req: Request, res: Response, _: any) {
  res.status(404).json({ error: 'Route NOT FOUND' })
}
