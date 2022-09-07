import { Model, DataTypes, Sequelize, QueryTypes } from 'sequelize'
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

    static async getRankingByCompetitionId(competitionId: any) {
      const id = parseInt(competitionId)
      if (!Number.isInteger(id)) return []

      const query = `SELECT CAST(sum(donation_count) as int) AS donation_count,
                      teams."institutionId" AS id,
                      MAX(institutions.name) AS name FROM "competitionTeams"
                      LEFT JOIN teams ON "competitionTeams"."teamId" = "teams".id
                      LEFT JOIN institutions ON teams."institutionId" = institutions.id
                      WHERE "competitionId" = $competitionId
                      GROUP BY teams."institutionId"
                      ORDER BY donation_count DESC`

      const result = sequelize.query(query, {
        bind: {
          competitionId: id
        },
        type: QueryTypes.SELECT
      })
      return result
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
