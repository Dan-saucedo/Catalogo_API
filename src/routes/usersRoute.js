import express from "express";
import { registerUser, getUserStatus, loginUser, updateUser, deleteUser } from '../controllers/userController.js'

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getUserStatus);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;