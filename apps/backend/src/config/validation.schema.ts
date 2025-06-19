import * as Joi from 'joi';

export const validationSchema = Joi.object({
  // Server Configuration
  PORT: Joi.number().default(3001),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),

  // API Configuration
  API_PREFIX: Joi.string().default('api'),
  API_VERSION: Joi.string().default('v1'),

  // CORS Configuration
  CORS_ENABLED: Joi.boolean().default(true),
  CORS_ORIGIN: Joi.string().default('http://localhost:3000'),

  // Logging Configuration
  LOG_LEVEL: Joi.string()
    .valid('error', 'warn', 'info', 'verbose', 'debug')
    .default('debug'),

  // JWT Configuration (for future use)
  JWT_SECRET: Joi.string().optional(),
  JWT_EXPIRATION: Joi.number().optional(),
});
