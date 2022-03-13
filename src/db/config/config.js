require('dotenv').config();

module.exports = { 
  local: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
    "dialectOptions": {
      "ssl": {
        require: true,
        rejectUnauthorized: false
      }
    }
  },
  development: {
    use_env_variable: 'DATABASE_URL',
    dialect: "postgres",
    "dialectOptions": {
      "ssl": {
        require: true,
        rejectUnauthorized: false
      }
    }
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: "postgres",
    "dialectOptions": {
      "ssl": {
        require: true,
        rejectUnauthorized: false
      },
    }
  }
}
