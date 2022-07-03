import express from 'express';
import {
    comprobarTokenUsuario,
    confirmarTokenUsuario,
    crearUsuario, loginUsuario, nuevoPasswordUsuario,
    obtenerUsuarios, perfilUsuario, recuperarUsuario, revalidarToken,
} from '../controllers/usuarioController.js';
import {checkAuth} from "../middleware/checkAuth.js";
import {check} from "express-validator";
import {validarCampo} from "../middleware/validarCampo.js";
import {validarJWT} from "../middleware/validarJWT.js";

const router = express.Router();

router.get('/', obtenerUsuarios);
router.post('/crear', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('direccion', 'La dirección es obligatoria').not().isEmpty(),
    check('telefono', 'El telefono es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampo
], crearUsuario);
router.post('/login', loginUsuario);
router.get('/confirmar/:token', confirmarTokenUsuario);
router.post('/olvide-password', recuperarUsuario);
router.route('/olvide-password/:token').get(comprobarTokenUsuario).post(nuevoPasswordUsuario);
router.get( '/renew', validarJWT , revalidarToken );

router.get('/perfil', checkAuth, perfilUsuario);

export default router;
