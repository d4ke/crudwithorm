import express from 'express';
import 'reflect-metadata';
import { AppDataSource } from './data-source';
import userRoutes from './routes/UserRoutes';

const app = express();

app.use(express.json());
app.use('/api', userRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
