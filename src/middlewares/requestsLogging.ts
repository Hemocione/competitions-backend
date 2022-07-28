import { Request, Response, NextFunction } from 'express'

function logging(req: Request, res: Response, next: NextFunction) {
  const { rawHeaders, httpVersion, method, socket, url } = req
  const { remoteAddress, remoteFamily } = socket

  console.log(
    JSON.stringify({
      timestamp: Date.now(),
      rawHeaders,
      httpVersion,
      method,
      remoteAddress,
      remoteFamily,
      url,
    })
  )

  next()
}

export default logging
