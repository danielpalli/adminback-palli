import jwt from "jsonwebtoken";

export const generarJWT = id => {
    return jwt.sign({id}, "Aasfmioam29041j0mriasmaop", {expiresIn: '2h'});
};