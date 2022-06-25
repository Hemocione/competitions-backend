import express, { Express } from 'express'
import fs from 'fs'
import cors from 'cors'
import mongoSanitize from 'express-mongo-sanitize'
import helmet from 'helmet'
import xssEscape from '../middlewares/xssEscape'
import contentType from '../middlewares/contentType'
import requestLogging from '../middlewares/requestsLogging'
import {
  errorsMiddleware,
  notFoundRoute,
} from '../middlewares/errorsMiddleware'

//Initializes express
const init = (config: { expressApp: Express }) =>
  new Promise((resolve, reject) => {
    const app = config.expressApp
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
      fs.readdirSync('./src/routes').forEach(async (file) => {
        const { default: r } = await import(`../routes/${file.slice(0, -3)}`)
        app.use(r.url, r.router)
      })
    } catch (err) {
      reject(err)
    }

    // app.use(errorsMiddleware)
    // app.use(notFoundRoute)

    resolve(true)
  })

export default init
