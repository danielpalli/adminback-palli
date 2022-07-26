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

    await curso.save();
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
  const { id } = req.params;

  const curso = await Curso.findById(id);

  if (!curso) {
    const error = new Error('Curso no encontrado');
    return res.status(404).json({
      ok: false,
      msg: error.message,
    });
  }

  // if (curso.docente.toString() !== req.usuario._id.toString()) {
  //   const error = new Error('No tienes permisos para ver este curso');
  //   return res.status(401).json({
  //     ok: false,
  //     msg: error.message,
  //   });
  // }

  res.json({
    ok: true,
    curso,
  });
};

export const editarCurso = async (req, res) => {
  const { id } = req.params;

  const curso = await Curso.findById(id);

  if (!curso) {
    const error = new Error('Curso no encontrado');
    return res.status(404).json({
      ok: false,
      msg: error.message,
    });
  }

  if (curso.docente.toString() !== req.usuario._id.toString()) {
    const error = new Error('No tienes permisos para ver este curso');
    return res.status(401).json({
      ok: false,
      msg: error.message,
    });
  }

  curso.nombre = req.body.nombre || curso.nombre;
  curso.comision = req.body.comision || curso.comision;
  curso.descripcion = req.body.descripcion || curso.descripcion;
  curso.horas = req.body.horas || curso.horas;
  curso.docente = req.body.docente || curso.docente;
  curso.fechaInicio = req.body.fechaInicio || curso.fechaInicio;
  curso.fechaFin = req.body.fechaFin || curso.fechaFin;
  curso.estado = req.body.estado || curso.estado;
  curso.cupo = req.body.cupo || curso.cupo;

  try {
    const cursoAlmacenado = await curso.save();

    res.json({
      ok: true,
      cursoAlmacenado,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

export const eliminarCurso = async (req, res) => {
  const { id } = req.params;

  const curso = await Curso.findById(id);

  if (!curso) {
    const error = new Error('Curso no encontrado');
    return res.status(404).json({
      ok: false,
      msg: error.message,
    });
  }

  if (curso.docente.toString() !== req.usuario._id.toString()) {
    const error = new Error('No tienes permisos para ver este curso');
    return res.status(401).json({
      ok: false,
      msg: error.message,
    });
  }
  try {
    await curso.deleteOne();
    res.json({
      ok: true,
      msg: 'Curso eliminado',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

export const agregarAlumno = async (req, res) => {};

export const eliminarAlumno = async (req, res) => {};

export const designarDocente = async (req, res) => {};
