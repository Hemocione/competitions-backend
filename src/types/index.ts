import { Request } from 'express'

export interface User {
  id: string
  givenName: string
  surName: string
  bloodType: string
  birthDate: Date
  email: string
  phone: string
  gender: string
  isAdmin: boolean
}

export interface Context {
  req: Request
  user?: User
}

export interface CompetitionsRequest extends Request {
  user?: User
}
