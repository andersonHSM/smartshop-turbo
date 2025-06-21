import {CONFIG_NAMESPACE} from "./config.constants";

export default () => ({
  [CONFIG_NAMESPACE.APP]: {
    port: parseInt(process.env.PORT || '3001', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
    apiPrefix: process.env.API_PREFIX || 'api',
    apiVersion: process.env.API_VERSION || 'v1',
    logLevel: process.env.LOG_LEVEL || 'debug',
  },
  [CONFIG_NAMESPACE.CORS]: {
    enabled: process.env.CORS_ENABLED === 'true',
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  },
  [CONFIG_NAMESPACE.JWT]: {
    secret: process.env.JWT_SECRET,
    expiresIn: parseInt(process.env.JWT_EXPIRATION || '3600', 10),
  },
});
