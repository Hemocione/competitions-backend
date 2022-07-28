import { Model, DataTypes, Sequelize } from 'sequelize'
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
                      teams."institutionId" AS institution_id,
                      MAX(institutions.name) AS institution_name FROM "competitionTeams"
                      LEFT JOIN teams ON "competitionTeams"."teamId" = "teams".id
                      LEFT JOIN institutions ON teams."institutionId" = institutions.id
                      WHERE "competitionId" = ${id}
                      GROUP BY "institutionId"
                      ORDER BY donation_count DESC`

      const data = (await sequelize.query(query));
      return data[0]
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
