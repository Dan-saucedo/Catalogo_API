import mongoose from "mongoose";

const User = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    }
}, { 
    timestamps: true 
});

const userModel = mongoose.model('User', User);
export default userModel;