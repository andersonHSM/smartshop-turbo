# NestJS Backend Application

This is a NestJS backend application built with TypeScript.

## Description

This backend provides RESTful API endpoints to manage users and other resources. It comes with Swagger documentation,
validation, and proper error handling.

## Installation

```bash
npm install
```

## Running the app

```bash
# development
npm run dev

# production mode
npm run build
npm run start:prod
```

## Test

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## API Documentation

Once the application is running, you can access the Swagger documentation at:

```
http://localhost:3000/api
```

## Features

- RESTful API with CRUD operations
- Validation using class-validator
- API documentation with Swagger
- Unit and E2E tests
- Error handling and proper HTTP responses
