import express from 'express';
import { agregarMateria, obtenerMaterias } from '../controllers/materiaController.js';
import { check } from 'express-validator';
import { validarCampo } from '../middleware/validarCampo.js';
const router = express.Router();

router.get('/', obtenerMaterias);
router.post(
    '/agregar',
    [
      check('nombre', 'El nombre es obligatorio').not().isEmpty(),
      check('horario', 'El horario es obligatorio').not().isEmpty(),
      check('cupo', 'El cupo es obligatoria, y el minimo es 2').not().isEmpty().isInt({ min: 2 }),
      validarCampo,
    ],
    agregarMateria
  );

export default router;
