import { Model, DataTypes, Sequelize } from 'sequelize'
import {
  HemocioneModels,
  DonationAttributes,
  DonationCreationAttributes,
} from './types'

class donation extends Model<DonationAttributes, DonationCreationAttributes> {
  static associate(models: HemocioneModels) {
    this.belongsTo(models.competitionTeam)

    this.belongsTo(models.competition)
  }
}

export default function init(sequelize: Sequelize) {
  donation.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      user_name: DataTypes.STRING,
      user_email: DataTypes.STRING,
      competitionTeamId: DataTypes.INTEGER,
      competitionId: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'donation',
    }
  )
  return donation
}
