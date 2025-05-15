import express from 'express';
const app = express();
import cors from 'cors';
import authRoute from './routes/user.js';

app.use(cors());
app.use(express.json());

app.use('/api/v1/', authRoute);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});