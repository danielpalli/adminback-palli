import Usuario from '../models/Usuario.js';
import { generarId } from '../helpers/generarId.js';
import { generarJWT } from '../helpers/generarJWT.js';

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
    const { email } = req.body;
    const existeUsuario = await Usuario.findOne({ email });

    if (existeUsuario) {
      const error = new Error('Usuario ya registrado');
      return res.status(400).json({
        ok: false,
        msg: error.message,
      });
    }

    const usuario = new Usuario(req.body);

    usuario.token = generarId();
    await usuario.save();

    res.json({
      ok: true,
      usuario,
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

    if (!usuario.confirmado) {
      const error = new Error('Tu cuenta no ha sido confirmado');
      return res.status(404).json({
        ok: false,
        msg: error.message,
      });
    }
    if (!(await usuario.comprobarPassword(password))) {
      const error = new Error('La contraseña es incorrecta');
      return res.status(404).json({
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

export const confirmarTokenUsuario = async (req, res) => {
  try {
    const { token } = req.params;
    const usuario = await Usuario.findOne({ token });

    if (!usuario) {
      const error = new Error('Token no válido');
      return res.status(404).json({
        ok: false,
        msg: error.message,
      });
    }

    usuario.confirmado = true;
    usuario.token = '';
    await usuario.save();

    res.json({
      ok: true,
      msg: 'Usuario confirmado correctamente',
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    });
  }
};

export const recuperarUsuario = async (req, res) => {
  try {
    const { email } = req.body;
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      const error = new Error('El Usuario no existe');
      return res.status(400).json({
        ok: false,
        msg: error.message,
      });
    }

    usuario.token = generarId();
    await usuario.save();

    res.json({
      ok: true,
      msg: 'Hemos enviado un main con las instrucciones',
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    });
  }
};

export const comprobarTokenUsuario = async (req, res) => {
  const { token } = req.params;
  const tokenValido = await Usuario.findOne({ token });

  if (!tokenValido) {
    const error = new Error('Token no válido');
    return res.status(404).json({
      ok: false,
      msg: error.message,
    });
  }

  res.json({
    ok: true,
    msg: 'Token valido y el Usuario existe',
  });
};

export const nuevoPasswordUsuario = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const usuario = await Usuario.findOne({ token });

    if (!usuario) {
      const error = new Error('Token no válido');
      return res.status(404).json({
        ok: false,
        msg: error.message,
      });
    }

    usuario.password = password;
    usuario.token = '';
    await usuario.save();

    res.json({
      ok: true,
      msg: 'Contraseña modificada correctamente',
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
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
    token,
  });
};
