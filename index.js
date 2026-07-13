import express from 'express';
import helmet from 'helmet';
import 'dotenv/config';
import mongoose from 'mongoose';
import productRoutes from './src/routes/productsRoute.js';
import userRoutes from './src/routes/usersRoute.js';

const app = express();
const PORT = process.env.PORT || 5100;

app.use(express.json());
app.use(helmet());
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'You connected successfully 👌',
    status: 'Online',
  });
});

const startServer = async () => {
  if (!process.env.MONGO_URI) {
    console.error('Error: MONGO_URI no está definido en las variables de entorno');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado a MongoDB 🙌');

    app.listen(PORT, () => {
      console.log(`Hola mundo http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error connection MongoDB', error.message);
    process.exit(1);
  }
};

startServer();

export default app;