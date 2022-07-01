import express from 'express';
import {
    confirmarTokenUsuario,
    crearUsuario, loginUsuario,
    obtenerUsuarios,
} from '../controllers/usuarioController.js';

const router = express.Router();

router.get('/', obtenerUsuarios);
router.post('/crear', crearUsuario);
router.post('/login', loginUsuario);
router.get('/confirmar/:token', confirmarTokenUsuario);

export default router;
