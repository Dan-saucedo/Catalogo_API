import jwt from 'jsonwebtoken';

export const verifyToken = ( req, res, next ) => {
    const token = req.header( 'app-token' );
    if(!token) 
        return res.status(401).json({ message: "Acceso denegado ❌: Y tu token? "})

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(401).json({ message: "Token no valido o expirado" });
    }
};