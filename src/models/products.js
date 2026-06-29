import { MongoGCPError } from "mongodb";
import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
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
        default: date.now
    }
});

productSchema.index({ name: 'text', description: 'text'});
export default mongoose.model('Product', productSchema);