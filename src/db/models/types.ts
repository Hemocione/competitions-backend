import { Model, ModelStatic, Optional } from 'sequelize'

export type CompetitionTeamAttributes = {
  id: number
  donation_count: number
  teamId: number
  competitionId: number
  createdAt: Date
  updatedAt: Date
}

export type TeamAttributes = {
  id: number
  name: string
  institutionId: number
  createdAt: Date
  updatedAt: Date
}

export type CompetitionAttributes = {
  id: number
  name: string
  start_at: Date
  end_at: Date
  createdAt: Date
  updatedAt: Date
  published: boolean
  publication_date: Date | null
}

export type InstitutionAttributes = {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
}

export type DonationAttributes = {
  id: number
  user_name: string
  user_email: string
  competitionTeamId: number
  competitionId: number
  createdAt: Date
  updatedAt: Date
}

export type HemocioneModels = {
  team: ModelStatic<Model<TeamAttributes>>
  competitionTeam: ModelStatic<Model<CompetitionTeamAttributes>>
  competition: ModelStatic<Model<CompetitionAttributes>>
  donation: ModelStatic<Model<DonationAttributes>>
  institution: ModelStatic<Model<InstitutionAttributes>>
}

export type CompetitionTeamCreationAttributes = Optional<
  CompetitionTeamAttributes,
  'id' | 'createdAt' | 'updatedAt'
>

export type TeamCreationAttributes = Optional<
  TeamAttributes,
  'id' | 'createdAt' | 'updatedAt'
>

export type DonationCreationAttributes = Optional<
  DonationAttributes,
  'id' | 'createdAt' | 'updatedAt'
>

export type InstitutionCreationAttributes = Optional<
  InstitutionAttributes,
  'id' | 'createdAt' | 'updatedAt'
>

export type CompetitionCreationAttributes = Optional<
  CompetitionAttributes,
  'id' | 'name' | 'start_at' | 'end_at' | 'createdAt' | 'updatedAt'
>
