import { Sequelize } from 'sequelize'
import config, { isLocalConfigs } from '../../config'

import competition_team from './competition_team'
import competition from './competition'
import donation from './donation'
import institution from './institution'
import team from './team'

// Fix bug where postgres would always turn to UTC
import pg from 'pg'
pg.types.setTypeParser(1082, 'text', function (text) {
  return text
})
pg.types.setTypeParser(1184, 'text', function (text) {
  return text
})
pg.types.setTypeParser(1114, 'text', function (text) {
  return text
})

let sequelize
if (!isLocalConfigs(config)) {
  sequelize = new Sequelize(config.database_url, config.database)
} else {
  sequelize = new Sequelize(
    config.database.database,
    config.database.username,
    config.database.password,
    config.database
  )
}
const models = {
  competitionTeam: competition_team(sequelize),
  competition: competition(sequelize),
  donation: donation(sequelize),
  institution: institution(sequelize),
  team: team(sequelize),
  sequelize,
}

models.competition.associate(models as any)
models.competitionTeam.associate(models as any)
models.donation.associate(models as any)
models.institution.associate(models as any)
models.team.associate(models as any)

export default models
