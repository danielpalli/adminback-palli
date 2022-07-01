import response from 'express';

const obtenerUsuarios = (req, res = response) => {
    res.send({msg: true});
};
const crearUsuario = (req, res = response) => {
    res.send({msg: true});
};

export {
    obtenerUsuarios,
    crearUsuario,
};
