import express from "express";
import { createProducts, getProducts, updateProducts, deleteProducts } from '../controllers/productController.js';

const router = express.Router();

router.post('/', createProducts);
router.get('/:id', getProducts);
router.put('/:id', updateProducts);
router.delete('/:id', deleteProducts);

export default router;