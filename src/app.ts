import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';
const app: Application = express();

app.use(express.json());
app.use(cors({ origin: '*' }));

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Visionary-AI');
});

app.use('/api/v1', router);

app.use(globalErrorHandler);

export default app;
