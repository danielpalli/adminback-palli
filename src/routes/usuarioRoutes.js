import express from 'express';
import {
    crearUsuario,
    obtenerUsuarios,
} from '../controllers/usuarioController.js';

const router = express.Router();

router.get('/', obtenerUsuarios);
router.post('/crear', crearUsuario);
router.post('/login', (req, res)=>{
    const {body} = req;
    console.log(body);
});

export default router;
