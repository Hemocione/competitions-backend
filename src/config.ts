import dotenv from "dotenv";
dotenv.config();

import { Dialect } from "sequelize";

function getEnvVariable(property: string, defaultValue: string): string {
  const value = process.env[property];
  if (!value && defaultValue === "throw:required") {
    throw new Error(
      `ENV variable is required. Please set ${property} in .env file`
    );
  }
  if (typeof value === "undefined") {
    return defaultValue;
  }
  return value;
}

const defaultConfigs = {
  environment: getEnvVariable("NODE_ENV", "develop"),
  secretRecaptchaKey: getEnvVariable("SECRET_RECAPTCHA_KEY", "secret"),
  sentryDsn: getEnvVariable("SENTRY_DSN", ""),
  port: getEnvVariable("PORT", "8080"),
  api_url: getEnvVariable("API_URL", "https://hemocione-id-dev.herokuapp.com"),
};

let databaseConfigs;

if (defaultConfigs.environment === "local") {
  databaseConfigs = {
    database: {
      database: getEnvVariable("DB_NAME", "throw:required"),
      username: getEnvVariable("DB_USER", "throw:required"),
      password: getEnvVariable("DB_PASS", "throw:required"),
      host: getEnvVariable("DB_HOST", "throw:required"),
      dialect: "postgres" as Dialect,
      dialectOptions: {
        useUTC: false,
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      timezone: "America/Sao_Paulo",
    },
  };
} else {
  databaseConfigs = {
    database_url: getEnvVariable("DATABASE_URL", "throw:required"),
    database: {
      use_env_variable: "DATABASE_URL",
      dialect: "postgres" as Dialect,
      dialectOptions: {
        useUTC: false,
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      timezone: "America/Sao_Paulo",
    },
  };
}

export function isLocalConfigs(
  configs: DevelopmentConfigs | LocalConfigs
): configs is LocalConfigs {
  return configs.environment === "local";
}

interface DefaultConfigs {
  environment: string;
  sentryDsn: string;
  secretRecaptchaKey: string;
  port: string;
  api_url: string;
}

interface LocalConfigs extends DefaultConfigs {
  database: {
    database: string;
    username: string;
    password: string;
    host: string;
    dialect: Dialect;
    dialectOptions: {
      useUTC: boolean;
      ssl: {
        require: boolean;
        rejectUnauthorized: boolean;
      };
    };
    timezone: string;
  };
}

interface DevelopmentConfigs extends DefaultConfigs {
  database_url: string;
  database: {
    use_env_variable: string;
    dialect: Dialect;
    dialectOptions: {
      useUTC: boolean;
      ssl: {
        require: boolean;
        rejectUnauthorized: boolean;
      };
    };
    timezone: string;
  };
}

const config: DevelopmentConfigs | LocalConfigs = {
  ...defaultConfigs,
  ...databaseConfigs,
};

export default config;
