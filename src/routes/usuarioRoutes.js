import express from 'express';
import {
  actualizarUsuario,
  crearUsuario,
  eliminarUsuario,
  loginUsuario,
  obtenerUsuario,
  obtenerUsuarios,
  perfilUsuario,
  revalidarToken,
} from '../controllers/usuarioController.js';
import { checkAuth } from '../middleware/checkAuth.js';
import { check } from 'express-validator';
import { validarCampo } from '../middleware/validarCampo.js';
import { validarJWT } from '../middleware/validarJWT.js';

const router = express.Router();

router.get('/', obtenerUsuarios);
router.get('/info/:id', obtenerUsuario);

router.post(
  '/crear',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('direccion', 'La dirección es obligatoria').not().isEmpty(),
    check('telefono', 'El telefono es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('perfil', 'El perfil es obligatorio').not().isEmpty(),
    check('sexo', 'El sexo es obligatorio').not().isEmpty(),
    validarCampo,
  ],
  crearUsuario
);
router.post('/login', loginUsuario);
router.get('/renew', validarJWT, revalidarToken);
router.get('/perfil', checkAuth, perfilUsuario);
router.put(
  '/:id',
  [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('direccion', 'La dirección es obligatoria').not().isEmpty(),
    check('telefono', 'El telefono es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('perfil', 'El perfil es obligatorio').not().isEmpty(),
    validarCampo,
  ],
  actualizarUsuario
);
router.delete('/:id', validarJWT, eliminarUsuario);

export default router;

