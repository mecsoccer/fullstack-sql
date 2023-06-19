import swaggerJsdoc, { type Options } from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { type Express, type Response } from 'express'

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Browse asteroids',
      description: 'Backend API ',
      version: '1.0.0'
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        refreshedTokenResponse: {
          properties: {
            accessToken: {
              type: 'string'
            }
          }
        },
        loginResponse: {
          properties: {
            accessToken: {
              type: 'string'
            },
            token: {
              type: 'string'
            },
            status: {
              type: 'string'
            }
          }
        }
      }
    }
  },

  apis: ['./src/controllers/*.ts']
}

const swaggerSpec = swaggerJsdoc(options)

function swaggerDocs (app: Express) {
  app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  app.get('/api/v1/docs.json', (_, res: Response) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
}

export default swaggerDocs
