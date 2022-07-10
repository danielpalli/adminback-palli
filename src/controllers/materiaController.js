import Materia from '../models/Materia.js';

export const obtenerMaterias = async (req, res) => {
  const materias = await Materia.find({}, 'nombre horario cupo estado alumnos');
  res.json({
    ok: true,
    materias,
  });
};

export const agregarMateria = async (req, res) => {
  try {
    const { nombre, horario } = req.body;
    const existeMateria = await Materia.findOne({ nombre, horario });

    if (existeMateria) {
      const error = new Error('Materia ya registrada');
      return res.status(400).json({
        ok: false,
        msg: error.message,
      });
    }

    const materia = new Materia(req.body);

    await materia.save();
    res.json({
      ok: true,
      materia,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    });
  }
};