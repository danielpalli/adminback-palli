import express from 'express';
import {
    crearUsuario,
    obtenerUsuarios,
} from '../controllers/usuarioController.js';

const router = express.Router();

router.get('/', obtenerUsuarios);
router.post('/crear', crearUsuario);

export default router;
