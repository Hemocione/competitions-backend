import { User, CompetitionsRequest } from '../types'
import { Response, NextFunction } from 'express'
import { Unauthorized, Unexpected } from '../errors'

const validate = {
  admin: (user: User) => {
    return user.isAdmin
  },
}

type validRoles = 'admin'

const validRoles = ['admin']

function isValidRoles(roles: string[]): roles is validRoles[] {
  return roles.every((role) => validRoles.includes(role))
}

export default function validateRoles(roles: string[]) {
  return async (
    req: CompetitionsRequest,
    _res: Response,
    next: NextFunction
  ) => {
    const { user } = req
    if (!user) {
      return next(new Unauthorized('Usuário não autenticado'))
    }

    if (!isValidRoles(roles))
      return next(new Unexpected('Permissões inválidas'))
    const hasAllRoles = roles.every((role) => validate[role])

    if (!hasAllRoles)
      return next(new Unauthorized('Usuário não possui permissão'))

    next()
  }
}
