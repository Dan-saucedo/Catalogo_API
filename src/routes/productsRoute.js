import express from "express";
import { createProducts, getProducts, updateProducts, deleteProducts } from '../controllers/productController.js';
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

//RUTAS PUBLICAS
router.get('/:id', getProducts);
router.get('/', getProducts);

//RUTAS PROTEGIDAS
router.post('/', verifyToken, createProducts);
router.put('/:id', verifyToken, updateProducts);
router.delete('/:id', verifyToken, deleteProducts);

export default router;