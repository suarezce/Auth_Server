import 'dotenv/config.js';
import jwt from 'jsonwebtoken';

export const verifyJWT = (req, res, next) => {
    // Obtener el encabezado de autorización
    const authHeader = req.headers.authorization || req.headers.Authorization;

    // Verificar si el encabezado de autorización está presente y comienza con 'Bearer '
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Sin Autorización: No token provisto' });
    }

    // Extraer el token del encabezado
    const token = authHeader.split(' ')[1];

    console.log(token)

    // Verificar el token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            // Manejar errores de verificación
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ error: 'Sin Autorización: Token expiro' });
            } else if (err.name === 'JsonWebTokenError') {
                return res.status(401).json({ error: 'Sin Autorización: Token invalido' });
            } else {
                return res.status(401).json({ error: 'Sin Autorización: Fallo verificación del Token' });
            }
        }

        // Asignar el usuario y roles al objeto de solicitud
        req.user = decoded.UserInfo.username;
        req.roles = decoded.UserInfo.roles;

        // Continuar con el siguiente middleware
        next();
    });
};