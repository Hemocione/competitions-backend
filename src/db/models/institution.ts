import { Model, DataTypes, Sequelize, FindOptions } from 'sequelize'
import {
  HemocioneModels,
  InstitutionAttributes,
  InstitutionCreationAttributes,
} from './types'

export default function init(sequelize: Sequelize) {
  class institution extends Model<
    InstitutionAttributes,
    InstitutionCreationAttributes
  > {
    static associate(models: HemocioneModels) {
      this.hasMany(models.team)
    }

    static getRankingByCompetitionId(competitionId: any) {
      const id = parseInt(competitionId)
      if (!Number.isInteger(id)) return []

      const query: FindOptions = {
        attributes: {
          include: [
            [
              sequelize.literal(`(SELECT SUM(donation_count) 
                                         FROM "competitionTeams" AS competition
                                         INNER JOIN teams AS team ON team.id = competition."teamId" AND institution.id = team."institutionId"
                                         WHERE competition."competitionId" = ${id})`),
              'total_donations',
            ],
          ],
          exclude: ['createdAt', 'updatedAt'],
        },
        order: [[sequelize.literal('total_donations'), 'DESC']],
      }

      return this.findAll(query)
    }
  }
  institution.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      name: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'institution',
    }
  )

  return institution
}
