import jwt from 'jsonwebtoken';

export const generarJWT = (id) => {
  const JWT_SECRET = 'Aasfmioam29041j0mriasmaop';
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '2h' });
};
