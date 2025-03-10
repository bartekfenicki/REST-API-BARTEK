import express, { Application } from 'express';
import dotenvFlow from 'dotenv-flow';
import routes from './routes';
import { connect } from './repository/database';
import { setupDocs } from './util/documentation';
import cors from 'cors';

dotenvFlow.config();

const app: Application = express();

function setupCors() {
  app.use(cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ['auth-token', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
    credentials: true
  }));
}


export function startServer() {
    setupCors();
    app.use(express.json());
    app.use('/api', routes);
    setupDocs(app);
    connect();
    const PORT: number = parseInt(process.env.PORT as string) || 4000;
    app.listen(PORT, function(){
    console.log('Server is running on port ' + PORT);
  })
}