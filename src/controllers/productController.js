import { text } from "express";
import productsModel from "../models/products.js";

//CREATE PRODUCT
export const createProducts = async ( req, res ) => {
    try {
        const newProduct = new productsModel(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
  } catch (error) {
        res.status(400).json({ msg: error.message });
  }
};

//READ: 
export const getProducts = async ( req, res ) => {
    try {

        if( req.params.id ){
            const product = await productsModel.findById( req.params.id );
            if(!product){
                return res.status(404).json({ msg: "Producto no encontrado"})
            }
            return res.status(200).json(product);
        }
        const { page= 1, limit= 10, search } = req.query;
        let query = {};

        if( search ){
            query = {$text: {$search: search}};
        }

        const products = await productsModel.find(query)
            .limit( limit*1 )
            .skip((page - 1) * limit)
            .exec();

        res.status(200).json(products);
    } catch(error) {
        res.status(500).json({ msg: error.message})
    }
};

//UPDATE PRODUCT
export const updateProducts = async ( req, res ) => {
    try{
        const updatedProducts = await productsModel.findByIdAndUpdate( req.params.id, req.body, { new: true });
        res.status(200).json(updatedProducts);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

//DELETE PRODUCT
export const deleteProducts = async ( req, res ) => {
    try{
        await productsModel.findByIdAndDelete( req.params.id );
        res.status(200).json({msg: "Producto eliminado ❌"});
    } catch(error) {
        res.status(400).json({ msg: error.message });
    }
};
