import express, { Request, Response, NextFunction } from 'express';
import apiRoutes from './routes/apiRoutes';
import { errorHandler } from './middlewares/errorHandlerMiddleware';
import logger from './utils/logger';

const app = express();

app.use(express.json());
app.use('/api', apiRoutes);

// Global Error Handler
app.use(errorHandler);

export default app;
