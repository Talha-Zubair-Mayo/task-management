const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');



let loaded = false;
if (process.env.NODE_ENV) {
  const envFile = `${process.env.NODE_ENV}.env`;
  const envPath = path.resolve(__dirname, 'env', envFile);
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    loaded = true;
  }
}
if (!loaded) {
  const envPath = path.resolve(__dirname, '../../.env');
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
  } else {
    dotenv.config(); 
  }
}

const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 5000,

  db: {
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development',
  },

  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  },

  api: {
    prefix: process.env.API_PREFIX || 'api',
    corsOrigin: process.env.CORS_ORIGIN || 'http:localhost:3001',
  },
};

const requiredEnvVars = [
  'DB_NAME',
  'DB_USER',
  'DB_PASSWORD',
  'DB_HOST',
  'JWT_SECRET',
];

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingEnvVars.join(', ')}`
  );
}

module.exports = config; 