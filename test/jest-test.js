'use strict'
const path = require('path')
const createMiddleware = require('@apidevtools/swagger-express-middleware')
const SwaggerParser = require('@apidevtools/swagger-parser')
const express = require('express')
const app = express()

const loadSwaggerFile = async (file) => {
  const swaggerFile = path.join(__dirname, file)
  return SwaggerParser.dereference(swaggerFile)  
}

const createSwaggerMiddlewareApp = async () => {
  const parsedSwaggerSpec = await loadSwaggerFile('./swagger/swagger_output.json')
  const middleware = createMiddleware(parsedSwaggerSpec, app)
  app.use(
    middleware.metadata(),
    middleware.CORS(),
    middleware.parseRequest(),
    middleware.validateRequest(),  
  )
  return app
}

module.exports = createSwaggerMiddlewareApp