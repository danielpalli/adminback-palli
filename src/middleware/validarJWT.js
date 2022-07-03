import jwt from 'jsonwebtoken';
import Usuario from "../models/Usuario.js";

export const validarJWT = (req, res, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'error en el token'
        });
    }
    try {
        const {id, nombre, apellido, direccion, telefono, perfil, email} = jwt.verify(token, Aasfmioam29041j0mriasmaop);
        req.id = id;
        req.nombre = nombre;
        req.apellido = apellido;
        req.direccion = direccion;
        req.telefono = telefono;
        req.perfil = perfil;
        req.email = email;
    } catch (e) {
        console.log(e);
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }
    next();
};


