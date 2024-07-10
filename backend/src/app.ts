import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes';
import errorHandler from "./middlewares/errorHandler";

dotenv.config();

const app = express();

async function initializeApp() {
  try {

    console.log('Connected to MySQL')

    app.use(express.json());
    app.use(cors({
      origin: 'http://localhost:3000'
    }));

    app.use('/api', routes);

    app.use(errorHandler);

    console.log('App initialized successfully');
  } catch (error) {
    console.error('Failed to initialize the app:', error);
    throw error;
  }
}

initializeApp();

export default app;
