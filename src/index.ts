import express from 'express';
import dotenv from 'dotenv';
import imageRoutes from './routes/imageRoutes';
import helmet from 'helmet';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use('/leituradeimagens', imageRoutes);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Aplicação rodando em http://localhost:${PORT}/leituradeimagens`);
});