import response from 'express';
import Usuario from "../models/Usuario.js";
import {generarId} from "../helpers/generarId.js";


export const obtenerUsuarios = (req, res = response) => {
    res.send({msg: true});
};
export const crearUsuario = async (req, res = response) => {

    const {email} = req.body;
    const existeUsuario = await Usuario.findOne({email});

    if (existeUsuario) {
        const error = new Error('Usuario ya registrado');
        return res.status(400).json({msg: error.message});
    }

    try {
        const usuario = new Usuario(req.body);
        usuario.token = generarId();
        await usuario.save();
        res.json(usuario);
    } catch (e) {
        console.log(e);
    }
};

