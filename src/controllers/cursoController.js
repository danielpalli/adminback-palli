import { Curso } from '../models/Curso.js';

export const obtenerCursos = async (req, res) => {
  const cursos = await Curso.find().where('docente').equals(req.usuario);
  res.json({
    ok: true,
    cursos,
  });
};

export const nuevoCurso = async (req, res) => {
  try {
    const { comision } = req.body;
    const existeComision = await Curso.findOne({ comision });

    if (existeComision) {
      const error = new Error('Comision ya registrada');
      return res.status(400).json({
        ok: false,
        msg: error.message,
      });
    }

    const curso = new Curso(req.body);

    // await curso.save();
    res.json({
      ok: true,
      curso,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

export const obtenerCurso = async (req, res) => {
    
};

export const editarCurso = async (req, res) => {};

export const eliminarCurso = async (req, res) => {};

export const agregarAlumno = async (req, res) => {};

export const eliminarAlumno = async (req, res) => {};

export const designarDocente = async (req, res) => {};
