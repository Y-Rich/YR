const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const env = require('dotenv');

env.config();

const PORT = process.env.PORT || 8010;
const apiURL = `http://localhost:${PORT}`;

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Team Project - Edukit API',
      version: '1.0.0',
      description: 'API with express',
      license: {
        name: 'MIT',
        url: apiURL + '/api-docs/',
      },
      contact: {
        name: 'epitone',
        url: 'https://github.com/Y-Rich/YR',
        email: 'epitoneplus@gmail.com',
      },
    },
    servers: [
      {
        url: apiURL,
        description: 'local Server',
      },
    ],
  },
  apis: ['./routes/*.js', './swagger/*'],
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
