import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import { Application } from 'express';

export function setupDocs(app: Application) {
    const swaggerDefinition = {
        openapi: '3.0.0',
        info: {
            title: 'Bartek Fenicki API',
            version: '1.0.0',
            description: 'A simple Express Library API created by Bartek Fenicki',
        },
        servers: [
            {
                url: 'http://localhost:4000/api/',
                description: 'Development  local server',
            },
        ],
        components: {
            securitySchemes: {
                ApiKeyAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'auth-token',
                }
            },
            schemas: {
                Country: {
                    type: 'object',
                    properties: {
                        name: {type: 'string'},
                        capital: {type: 'string'},
                        area: {type: 'number'},
                        population: {type: 'number'},
                        currency: {type: 'string'},
                        description: {type: 'string'},
                        imageURL: {type: 'string'},
                    }
                },
                City: {
                    type: 'object',
                    properties: {
                        name: {type: 'string'},
                        area: {type: 'number'},
                        population: {type: 'number'},
                        country: {type: 'string'},
                        description: {type: 'string'},
                        imageURL: {type: 'string'},                    
                    }
                },
                User: {
                    type: 'object',
                    properties: {
                        id: {type: 'string'},
                        name: {type: 'string'},
                        email: {type: 'string'},
                        password: {type: 'string'},
                        registerDate: {type: 'string'},
                    }
                }
            }
        } 
    }
    const options = {
        swaggerDefinition,
        apis: ['**/*.ts'],
    }
    const swaggerSpec = swaggerJsDoc(options);

    app.use('/api/documentation', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

}