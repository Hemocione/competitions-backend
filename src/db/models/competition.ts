import { Model, DataTypes, Sequelize } from 'sequelize'
import {
  HemocioneModels,
  CompetitionAttributes,
  CompetitionCreationAttributes,
} from './types'

class competition extends Model<
  CompetitionAttributes,
  CompetitionCreationAttributes
> {
  static associate(models: HemocioneModels) {
    this.hasMany(models.competitionTeam)

    this.hasMany(models.donation)
  }
}

export default function init(sequelize: Sequelize) {
  competition.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      name: DataTypes.STRING,
      start_at: DataTypes.DATE,
      end_at: DataTypes.DATE,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'competition',
    }
  )
  return competition
}
