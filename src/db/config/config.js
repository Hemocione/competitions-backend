require('dotenv').config();

module.exports = { 
  local: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
    "dialectOptions": {
      useUTC: false,
      "ssl": {
        require: true,
        rejectUnauthorized: false
      }
    },
    timezone: 'America/Sao_Paulo'
  },
  development: {
    use_env_variable: 'DATABASE_URL',
    dialect: "postgres",
    "dialectOptions": {
      useUTC: false,
      "ssl": {
        require: true,
        rejectUnauthorized: false
      }
    },
    timezone: 'America/Sao_Paulo'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: "postgres",
    "dialectOptions": {
      useUTC: false,
      "ssl": {
        require: true,
        rejectUnauthorized: false
      },
    },
    timezone: 'America/Sao_Paulo'
  }
}
