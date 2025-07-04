import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoute from './routes/authRoute.js';
import bookRoute from './routes/bookRoutes.js'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('server is working fine :)');
});

app.use('/api/auth', authRoute);   // handles login/register
app.use('/api/books', bookRoute);  // protected book CRUD

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});

export default app ;