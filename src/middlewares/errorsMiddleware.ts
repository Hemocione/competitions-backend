import { Request, Response, NextFunction } from 'express'

export function errorsMiddleware(
  err: any,
  req: Request,
  res: Response,
  _: any
) {
  console.log('errorsMiddleware', 'reached here', err)
  res.header('Content-Type', 'application/json')
  res.status(err.status || 500).json({
    message: err.message,
  })
}

export function notFoundRoute(req: Request, res: Response, _: any) {
  res.status(404).json({ error: 'Route NOT FOUND' })
}
