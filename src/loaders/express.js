const express = require('express')
const fs = require('fs')
const cors = require('cors')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const xssEscape = require('../middlewares/xssEscape')
const contentType = require('../middlewares/contentType')
const requestLogging = require('../middlewares/requestsLogging')
const {
  errorsMiddleware,
  notFoundRoute,
} = require('../middlewares/errorsMiddleware')

//Initializes express
const init = ({ expressApp: app }) =>
  new Promise((resolve, reject) => {
    const corsOptions = {
      origin: '*',
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    }
    app.use(requestLogging)
    app.use(cors(corsOptions))
    app.use(contentType)
    app.use(express.json())
    app.use(xssEscape)
    //Serie de headers de segurança
    app.use(helmet())
    //Sanitize for nosql injection
    app.use(mongoSanitize())

    //loads every route file
    try {
      fs.readdirSync('./src/routes').forEach((file) => {
        const r = require(`../routes/${file.slice(0, -3)}`)
        app.use(r.url, r.router)
      })
    } catch (err) {
      reject(err)
    }

    app.use(errorsMiddleware)
    app.use(notFoundRoute)

    resolve()
  })

module.exports = init
