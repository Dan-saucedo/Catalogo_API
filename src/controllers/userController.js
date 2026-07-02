
import Usuario from '../models/usuarios.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../helpers/jwt.js';

export const registerUsuario = async (req, res) => {
    const {email, password} = req.body;

    try {
        let usuario = await Usuario.findOne({email})
        if (usuario) {
            return res.status(400).json({message:'This user is registered!'});
        }
        usuario = new Usuario({
            email,
            password
        });

        //Encrypt password
        const salt = await bcrypt.genSalt(10);
        usuario.pass = await bcrypt.hash(password, salt);

        await usuario.save();

        const payload = {id: usuario.id};
        const token = generateToken(payload);
        
        return res.status(201).json({message: "User registered successfully 😁", token});
    } catch (error) {
        return res.status(500).json({error:"Internal server error", message: error.message});
    }
};

export const loginUsuario = async(req, res) => {
    try {
        const {email, password} = req.body;
        //Verificar email*
        const usuario = await Usuario.findOne({email});
        if(!usuario){
            return res.status(400).json({message: "This user doesn't exist 🤨"});
        }

        //Verificar pass*
        const isMatch = await bcrypt.compare(password, usuario.password);
        if(!isMatch) return res.status(400).json({message: "Incorrect password ❓"});

        const payload = {id: usuario.id};
        const token = generateToken(payload);

        return res.json({message: "Successfully logged in, welcome back! 😊", token});

    } catch (error) {
        res.status(500).json({error: "Internal server error", message: error});
    }
};