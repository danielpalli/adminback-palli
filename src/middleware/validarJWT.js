import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

export const validarJWT = async (req, res, next) => {
  const JWT_SECRET = 'Aasfmioam29041j0mriasmaop';
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'error en el token',
    });
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);

    req.id = id;
    req.usuario = await Usuario.findById(id).select(
      '-password -token -createdAt -updatedAt -__v'
    );
  } catch (e) {
    console.log(e);
    return res.status(401).json({
      ok: false,
      msg: 'Token no válido',
    });
  }
  next();
};
