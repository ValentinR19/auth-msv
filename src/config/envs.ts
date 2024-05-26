import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  // PORT: number;
  // DB_HOST: string;
  // DB_PORT: number;
  // DB_USERNAME: string;
  // DB_PASSWORD: string;
  // DB_LOGGING: string;
  // DB_LOGGING_ENABLE: boolean;
  // DB_NAME: string;
  DATABASE_URL: string;
  NATS_SERVERS: string;
  JWT_SECRET: string;
}

const envsSchema = joi
  .object({
    DATABASE_URL: joi.string().required(),
    JWT_SECRET: joi.string().required(),
    NATS_SERVERS: joi.array().items(joi.string().required()),
  })
  .unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS.split(','),
});

if (error) {
  throw new Error(`Config Validation Error: ${error}`);
}

const envVars: EnvVars = value;

export const envs = {
  natsServers: envVars.NATS_SERVERS,
  databaseUrl: envVars.DATABASE_URL,
  jwtSecret: envVars.JWT_SECRET,
};
