import { Model, DataTypes, Sequelize } from 'sequelize'
import {
  HemocioneModels,
  TeamAttributes,
  TeamCreationAttributes,
} from './types'

export default function init(sequelize: Sequelize) {
  class team extends Model<TeamAttributes, TeamCreationAttributes> {
    static associate(models: HemocioneModels) {
      this.belongsTo(models.institution)

      this.hasMany(models.competitionTeam)

      this.belongsToMany(models.competition, {
        through: models.competitionTeam,
      })
    }
  }
  team.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      name: DataTypes.STRING,
      institutionId: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'team',
    }
  )
  return team
}
