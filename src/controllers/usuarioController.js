import Usuario from '../models/Usuario.js';
import { generarJWT } from '../helpers/generarJWT.js';
import bcrypt from 'bcrypt';

export const obtenerUsuarios = async (req, res) => {
  const usuarios = await Usuario.find(
    {},
    'nombre apellido direccion telefono perfil email'
  );
  res.json({
    ok: true,
    usuarios,
  });
};

export const crearUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existeUsuario = await Usuario.findOne({ email });

    if (existeUsuario) {
      const error = new Error('Usuario ya registrado');
      return res.status(400).json({
        ok: false,
        msg: error.message,
      });
    }

    const usuario = new Usuario(req.body);

    const salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync(password, salt);

    const token = generarJWT(usuario._id);

    await usuario.save();

    res.json({
      ok: true,
      usuario,
      token,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    });
  }
};

export const loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      const error = new Error('El usuario no existe');
      return res.status(404).json({
        ok: false,
        msg: error.message,
      });
    }

    const validPassword = bcrypt.compareSync(password, usuario.password);

    if (!validPassword) {
      const error = new Error('Contraseña incorrecta');
      return res.status(400).json({
        ok: false,
        msg: error.message,
      });
    }

    res.json({
      ok: true,
      _id: usuario._id,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      perfil: usuario.perfil,
      direccion: usuario.direccion,
      telefono: usuario.telefono,
      token: generarJWT(usuario._id),
    });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

export const perfilUsuario = (req, res) => {
  const { usuario } = req;
  res.json({
    ok: true,
    usuario,
  });
};

export const revalidarToken = async (req, res) => {
  const { id } = req;
  const usuario = await Usuario.findById(id);
  const token = await generarJWT(id);

  return res.json({
    ok: true,
    _id: usuario._id,
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    email: usuario.email,
    perfil: usuario.perfil,
    direccion: usuario.direccion,
    telefono: usuario.telefono,
    sexo: usuario.sexo,
    token,
  });
};

export const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findById(id);

    if (!usuario) {
      const error = new Error('El usuario no existe');
      return res.status(404).json({
        ok: false,
        msg: error.message,
      });
    }

    const { email, password, token, createdAt, updatedAt, ...campos } =
      req.body;

    if (usuario.email !== email) {
      const existeEmail = await Usuario.findOne({ email });
      if (existeEmail) {
        const error = new Error('El email ya existe');
        return res.status(400).json({
          ok: false,
          msg: error.message,
        });
      }
    }

    campos.email = email;

    const usuarioActualizado = await Usuario.findByIdAndUpdate(id, campos, {
      new: true,
    });

    await usuarioActualizado.save();

    res.json({
      ok: true,
      usuarioActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    });
  }
};

export const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findByIdAndDelete(id);

    if (!usuario) {
      const error = new Error('El usuario no existe');
      return res.status(404).json({
        ok: false,
        msg: error.message,
      });
    }

    res.json({
      ok: true,
      msg: 'Usuario eliminado correctamente',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    });
  }
};

export const obtenerUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findById(id);

    if (!usuario) {
      const error = new Error('El usuario no existe');
      return res.status(404).json({
        ok: false,
        msg: error.message,
      });
    }

    res.json({
      ok: true,
      usuario,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    });
  }
};
