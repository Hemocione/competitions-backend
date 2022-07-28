import validator from 'validator'
import { Request, Response, NextFunction } from 'express'

function transverseObj(inVal: any) {
  const q = [inVal]
  while (q.length !== 0) {
    const val = q.pop()
    if (typeof val === 'object' && val !== null) {
      Object.keys(val).forEach((elem) => {
        const type = typeof val[elem]
        if (type === 'string') {
          val[elem] = validator.escape(val[elem])
        } else if (type === 'object') {
          q.push(val[elem])
        }
      })
    } else {
      throw 'Unexpected value type'
    }
  }
}

function xssEscape(req: Request, res: Response, next: NextFunction) {
  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
    transverseObj(req.body)
    next()
  } else {
    next()
  }
}

export default xssEscape
