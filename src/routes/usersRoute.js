import express from "express";
import { registerUser, getUserStatus, loginUser, updateUser, deleteUser } from '../controllers/userController.js'
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

//RUTAS PUBLICAS
router.post('/register', registerUser);
router.post('/login', loginUser);

//RUTAS PARA VERIFICACION (USUARIOS AUTENTICADOS)
router.get('/profile', verifyToken, getUserStatus);
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, deleteUser);

export default router;