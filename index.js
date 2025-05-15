import express from 'express';
const app = express();
import cors from 'cors';

app.use(cors());
app.use(express.json());

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});