import { MongoGCPError } from "mongodb";
import mongoose, { Schema } from "mongoose";

const Product = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        index: true
    },
    price: {
        type: Number,
        required: true
    },
    dateOfRegister: {
        type: Date,
        default: Date.now
    }
});

Product.index({ name: 'text', description: 'text'});
export default mongoose.model('Product', Product);