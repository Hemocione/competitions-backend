import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import xssEscape from "../middlewares/xssEscape";
import contentType from "../middlewares/contentType";
import requestLogging from "../middlewares/requestsLogging";
import requireAll from "require-all";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import { errorsMiddleware } from "../middlewares/errorsMiddleware";
import config from "../config";

//Initializes express
const init = (expressConfig: { expressApp: Express }) =>
  new Promise(async (resolve, reject) => {
    const app = expressConfig.expressApp;
    let tracesSampleRate = 1.0;
    if (config.environment === "production") tracesSampleRate = 0.1;

    Sentry.init({
      dsn: config.sentryDsn,
      environment: config.environment,
      integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Tracing.Integrations.Express({ app }),
      ],
      tracesSampleRate,
    });

    // RequestHandler creates a separate execution context using domains, so that every
    // transaction/span/breadcrumb is attached to its own Hub instance
    app.use(Sentry.Handlers.requestHandler());
    // TracingHandler creates a trace for every incoming request
    app.use(Sentry.Handlers.tracingHandler());

    const corsOptions = {
      origin: "*",
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    };
    app.use(requestLogging);
    app.use(cors(corsOptions));
    app.use(contentType);
    app.use(express.json());
    app.use(xssEscape);
    //Serie de headers de segurança
    app.use(helmet());

    //Loads all routes
    requireAll({
      dirname: `${__dirname}/../routes`,
      recursive: true,
      resolve: ({ default: { url, router } }) => app.use(url, router),
    });

    // The error handler must be before any other error middleware and after all controllers
    // handle errors with no status or with status >= 500
    app.use(
      Sentry.Handlers.errorHandler({
        shouldHandleError(error) {
          return !error.status || error.status >= 500;
        },
      })
    );

    //loads every route file
    app.use(errorsMiddleware);

    // app.use(notFoundRoute)

    resolve(true);
  });

export default init;
