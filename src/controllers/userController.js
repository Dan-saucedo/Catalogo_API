import userModel from '../models/users.js';
//import bcrypt from 'bcryptjs';
import {generateToken} from '../helpers/jsonwebtoken.js';

//CREATE USER (REGISTER)
export const registerUser = async (req, res) => {
    const { name, last_name, email, password } = req.body;
    try {
        let user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message:'This user is registered!' });
        }
        user = new userModel({  name, last_name, email, password });

        //Encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {id: user.id};
        const token = generateToken(payload);
        
        return res.status(201).json({ message: "User registered successfully 😁", token });
    } catch (error) {
        return res.status(500).json({ error:"Internal server error", message: error.message });
    }
};

//READ USER (USER CAN SEE THEIR DATA)
export const getUserStatus = async( req, res ) => {
    try{
        const user = await userModel.findById( req.params.id).select('-password');

        if(!user) return res.status(404).json({ message: "User not found❓" });
        res.status(200).json(user);
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
};

//UPDATE USER
export const updateUser = async( req, res ) => {
    try{
        const { email } = req.body;
        const updatedUser = await userModel.findByIdAndUpdate( req.params.id, { email }, { new: true }).select('-password');
        res.status(200).json({ message: "Updated user" });
    } catch (error){
        res.status(400).json({ message: error.message});
    }
};

//DELETE USER
export const deleteUser = async( req, res ) => {
    try{
        await userModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User deleted successfully 🪦"});
    } catch(error){
        res.status(400).json({ message: error.message });
    }
};

//LOGIN USER
export const loginUser = async(req, res) => {
    try {
        const { email, password } = req.body;
        //Verificar email y que el usuario exista
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).json({message: "This user doesn't exist 🤨"});
        }

        //Verificar pass*
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message: "Incorrect password ❓"});

        const payload = {id: user.id};
        const token = generateToken(payload);

        return res.json({message: "Successfully logged in, welcome back! 😊", token});

    } catch (error) {
        res.status(500).json({error: "Internal server error", message: error});
    }
};