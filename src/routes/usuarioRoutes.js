import express from 'express';
import {
    comprobarTokenUsuario,
    confirmarTokenUsuario,
    crearUsuario, loginUsuario, nuevoPasswordUsuario,
    obtenerUsuarios, perfilUsuario, recuperarUsuario,
} from '../controllers/usuarioController.js';
import {checkAuth} from "../middleware/checkAuth.js";

const router = express.Router();

router.get('/', obtenerUsuarios);
router.post('/crear', crearUsuario);
router.post('/login', loginUsuario);
router.get('/confirmar/:token', confirmarTokenUsuario);
router.post('/olvide-password', recuperarUsuario);
router.route('/olvide-password/:token').get(comprobarTokenUsuario).post(nuevoPasswordUsuario);

router.get('/perfil', checkAuth, perfilUsuario);

export default router;
