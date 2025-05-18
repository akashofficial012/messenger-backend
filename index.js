import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './database/db.js';
import authRoute from './routes/user.js';
import cookieParser from "cookie-parser";
// import { errorMiddleware } from './middlewares/error.js';

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(errorMiddleware);

app.use('/api/v1/', authRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
