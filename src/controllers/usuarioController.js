
import Usuario from "../models/Usuario.js";
import {generarId} from "../helpers/generarId.js";
import {generarJWT} from "../helpers/generarJWT.js";

export const obtenerUsuarios = (req, res) => {
    res.send({msg: true});
};
export const crearUsuario = async (req, res) => {
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

export const loginUsuario = async (req, res) => {
    const {email, password} = req.body;
    const usuario = await Usuario.findOne({email});

    if (!usuario) {
        const error = new Error('El usuario no existe');
        return res.status(404).json({msg: error.message})
    }

    if (!usuario.confirmado) {
        const error = new Error('Tu cuenta no ha sido confirmado');
        return res.status(404).json({msg: error.message});
    }

    if (!await usuario.comprobarPassword(password)) {
        const error = new Error('La contraseña es incorrecta');
        return res.status(404).json({msg: error.message});
    }

    res.json({
        _id: usuario._id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        perfil: usuario.perfil,
        direccion: usuario.direccion,
        telefono: usuario.telefono,
        token: generarJWT(usuario._id)
    })
};

export const confirmarTokenUsuario = (req, res) => {
    console.log(req.params.token);
};