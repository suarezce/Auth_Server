import 'dotenv/config';
import jwt from 'jsonwebtoken';

export const verifyJWT = (req, res, next) => {
  //  console.log("estoy Aqui en verifyJWT");

    // 1. Obtener el encabezado de autorización
    const authHeader = req.headers.authorization || req.headers.Authorization;
    console.log('authHeader :', authHeader);

    // 2. Verificar si el encabezado de autorización está presente y comienza con 'Bearer '
    if (!authHeader?.startsWith('Bearer ')) {
        console.log('Token no proporcionado o formato incorrecto');
        return res.status(401).json({ error: 'Sin Autorización: No se proporcionó un token' });
    }

    // 3. Extraer el token
    const token = authHeader.split(' ')[1];

    // 4. Validar formato básico del token (opcional)
/*     if (!token || token.split('.').length !== 3) {
        console.log('Token mal formado');
        return res.status(401).json({ error: 'Sin Autorización: Token mal formado' });
    } */

    // 5. Verificar el token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            console.error('Error al verificar el token:', err);
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ error: 'Sin Autorización: Token expirado' });
            } else if (err.name === 'JsonWebTokenError') {
                return res.status(401).json({ error: 'Sin Autorización: Token inválido' });
            } else {
                return res.status(401).json({ error: 'Sin Autorización: Fallo en la verificación del token' });
            }
        }

        // 6. Asignar el usuario y roles al objeto de solicitud
        req.user = decoded.UserInfo.username;
        req.roles = decoded.UserInfo.roles;

        console.log('Usuario autenticado:', req.user, 'Roles:', req.roles);

        // 7. Continuar con el siguiente middleware
        next();
    });
};