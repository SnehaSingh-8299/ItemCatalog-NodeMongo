# ItemCatalog-NodeMongo

A project for quickly building RESTful APIs using Node.js, Express, and Mongoose.

By running a single command, you will get a production-ready Node.js app installed and fully configured on your machine. The app comes with many built-in features, such as authentication using JWT, request validation, unit and integration tests, continuous integration, docker support, API documentation, pagination, etc. For more details, check the features list below.

## Quick Start

To create a project, simply run:

```bash
npx create-nodejs-express-app <project-name>
```

Or

```bash
npm init nodejs-express-app <project-name>
```
# open .env and modify the environment variables (if needed)
```

## Table of Contents

- [Features](#features)
- [Commands](#commands)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Error Handling](#error-handling)
- [Validation](#validation)
- [Authentication](#authentication)
- [Authorization](#authorization)

## Features

- **NoSQL database**: [MongoDB](https://www.mongodb.com) object data modeling using [Mongoose](https://mongoosejs.com)
- **Authentication and authorization**: using [JSON WEB TOKEN]
- **Validation**: request data validation using [Joi](https://github.com/hapijs/joi)
- **Error handling**: centralized error handling mechanism
- **API documentation**: with [src/docs/Assigment_ItemMGT.postman_collection.json]
- **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv) and [cross-env](https://github.com/kentcdodds/cross-env#readme)
- **Security**: set security HTTP headers using [helmet](https://helmetjs.github.io)
- **Api hiting limit: set limit of apis according to time.
- **Api hiting time: set hit time of apis .
- **Santizing**: sanitize request data against xss and query injection
- **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)

## Commands

Running locally:

```bash
npm run start
```

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
# Port number
PORT=3000

# URL of the Mongo DB
MONGODB_URL=DB_URL

# JWT
# JWT secret key
JWT_SECRET=thisisasamplesecret
#REFRESH_SECRET_KEY
REFRESH_SECRET_KEY=jhduhsfjngjdnbjfnbjd
# Number of minutes after which an access token expires
SECRET_KEY_EXPIRY=30
# Number of days/minute after which a refresh token expires
REFRESH_SECRET_KEY_EXPIRY=45

# SMTP configuration options for the email service
# For testing, you can use a fake SMTP service like Ethereal: https://ethereal.email/create
SMTP_HOST=email-server
SMTP_PORT=587
SMTP_USERNAME=email-server-username
SMTP_PASSWORD=email-server-password
EMAIL_FROM=support@yourapp.com
```

## Project Structure

```
src\
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--docs\           # Pstman JSON files
 |--middlewares\    # Custom express middlewares
 |--models\         # Mongoose models (data layer)
 |--routes\         # Routes
 |--helpers\        # utility(jwt function) classes ,reponeses and functions
 |--app.js          # Express app(entry point)
```

## API Documentation

To view the list of available APIs and their specifications, run the postman and go to `http://localhost:3000/v1/` in your browser.

### API Endpoints

List of available routes:

**Auth routes**:\
`POST /v1/auth/register` - register\
`POST /v1/auth/login` - login\
`POST /v1/auth/verifyRefreshToken` - refresh auth tokens\

**Item routes**:\
`POST /v1/item/createItem` - create a item\
`GET /v1/item/getAllItems` - get all item\
`GET /v1/item/:id` - get item by id\
`PUT /v1/item/:id` - update item\
`DELETE /v1/item/:id` - delete item

## Error Handling

The app has a centralized error handling mechanism.

Controllers should try to catch the errors and forward them to the error handling middleware (by calling `next(error)`). For convenience, you can also wrap the controller inside the catchAsync utility wrapper, which forwards the error.


```

The error handling middleware sends an error response, which has the following format:

```json
{
  "statusCode": 0,
  "message": ""
}
```

## Validation

Request data is validated using [Joi](https://joi.dev/). Check the [documentation](https://joi.dev/api/) for more details on how to write Joi validation schemas.

The validation schemas are defined in the `src/validations` directory and are used in the routes by providing them as parameters to the `validate` middleware.

## Authentication

To require authentication for certain routes, you can use the `auth` middleware.

```javascript
const express = require("express");
const router = express.Router();
const itemController = require('../controllers/index');
const  authMiddleware   = require('../middlewares/authorization/authMiddleware');
/*
ItemCrud
*/
router.post('/createItem', authMiddleware.authenticateToken("user"), itemController.items.createItem);

module.exports = router;
```

These routes require a valid JWT access token in the Authorization request header using the Bearer schema. If the request does not contain a valid access token, an Unauthorized (401) error is thrown.

**Generating Access Tokens**:

An access token can be generated by making a successful call to the register (`POST /v1/auth/register`) or login (`POST /v1/auth/login`) endpoints. The response of these endpoints also contains refresh tokens (explained below).

An access token is valid for 30 minutes. You can modify this expiration time by changing the `SECRET_KEY_EXPIRY` environment variable in the .env file.

**Refreshing Access Tokens**:

After the access token expires, a new access token can be generated, by making a call to the refresh token endpoint (`POST /v1/auth/verifyRefreshToken`) and sending along a valid refresh token in the request body. This call returns a new access token and a new refresh token.

A refresh token is valid for 30 days. You can modify this expiration time by changing the `REFRESH_SECRET_KEY_EXPIRY` environment variable in the .env file.

## Authorization

The `auth` middleware can also be used to require certain rights/permissions to access a route.

```javascript
const express = require("express");
const router = express.Router();
const itemController = require('../controllers/index');
const  authMiddleware   = require('../middlewares/authorization/authMiddleware');
/*
ItemCrud
*/
router.post('/createItem', authMiddleware.authenticateToken("user"), itemController.items.createItem);
```

In the example above, an authenticated user can access this route only if that user has the `user` permission.

## Contributing

Contributions are more than welcome! Please check out the [contributing guide](CONTRIBUTING.md).

## License

[ISC](LICENSE)
