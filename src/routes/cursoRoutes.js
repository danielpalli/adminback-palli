import express from 'express';
import { agregarAlumno, editarCurso, eliminarAlumno, eliminarCurso, nuevoCurso, obtenerCurso, obtenerCursos } from '../controllers/cursoController.js';
import { validarJWT } from '../middleware/validarJWT.js';

const router = express.Router();


router.route('/')
    .get(validarJWT, obtenerCursos)
    .post(validarJWT, nuevoCurso);

router.route('/:id')
    .get(validarJWT, obtenerCurso)
    .put(validarJWT, editarCurso)
    .delete(validarJWT, eliminarCurso);

router.post('/agregar-alumno/:id', validarJWT, agregarAlumno);
router.post('/remover-alumno/:id', validarJWT, eliminarAlumno);

export default router;
