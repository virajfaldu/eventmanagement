import express from 'express';
import dotenv from 'dotenv';
import eventRoutes from './routes/event.routes';
import authRoutes from './routes/auth.routes';
import { sequelize } from './database';
import 'reflect-metadata';


dotenv.config();
const app = express();

app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(authRoutes);
app.use(eventRoutes);

sequelize.sync().then(() => {
  console.log('Database connected');
});

export default app;
