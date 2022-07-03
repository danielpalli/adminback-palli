import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

export const checkAuth = async (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        let token;

        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, 'Aasfmioam29041j0mriasmaop');

            req.usuario = await Usuario.findById(decoded.id).select("-password -confirmado -token -createdAt -updatedAt -__v");
            return next();
        } catch (e) {
            return res.status(404).json({msg: e})
        }
    }

    if (!token) {
        const error = new Error('Token no válido');
        res.status(401).json({msg: error.message});
    }

    next();
};