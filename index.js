import express from 'express';
import mongoose, { mongo } from 'mongoose';
import helmet from 'helmet';
import 'dotenv/config';
import productRoutes from '../main_project/src/routes/productsRoute.js';
import userRoutes from '../main_project/src/routes/usersRoute.js';
//import MONGO_URI from 'dotenv';

const app = express();
const PORT = process.env.PORT || 5100;

app.get('/', async(req, res) => {
    res.json({
        message: 'You connected successfully 👌',
        status: 'Online'
    });
});

//PROTECTORES 
app.use(express.json());
app.use(helmet());

//PARA RUTAS
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);


try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Conectado a MongoDB 🙌');
} catch(error) {
    console.error('Error connection MongoDB', error.message);
    process.exit(1); //Detiene la app
};


app.listen(PORT, () => {
    console.log(`Hola mundo http://localhost:${PORT}`);
});