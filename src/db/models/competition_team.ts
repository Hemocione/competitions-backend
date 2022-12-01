import { Model, DataTypes, Sequelize } from 'sequelize'
import {
  HemocioneModels,
  CompetitionTeamAttributes,
  CompetitionTeamCreationAttributes,
} from './types'

class competitionTeam extends Model<
  CompetitionTeamAttributes,
  CompetitionTeamCreationAttributes
> {
  declare id: number;
  declare donation_count: number;
  declare teamId: number;
  declare competitionId: number;
  declare createdAt: Date;
  declare updatedAt: Date;

  static associate(models: HemocioneModels) {
    this.belongsTo(models.team)

    this.belongsTo(models.competition)

    this.hasMany(models.donation)
  }
}

export default function init(sequelize: Sequelize) {
  competitionTeam.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      donation_count: DataTypes.INTEGER,
      teamId: DataTypes.INTEGER,
      competitionId: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'competitionTeam',
    }
  )

  return competitionTeam
}
