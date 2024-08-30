import express from 'express';
import imagesRoutes from './routes/ImagesRoutes';

const app = express();
const port = 3333;

app.use(express.json());
app.use('/api', imagesRoutes);

app.listen(port, () => {
  console.log(`Service for reading images in http://localhost:${port}`);
});