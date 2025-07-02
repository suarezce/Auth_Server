export const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        // Verificar si el usuario tiene roles asignados
        if (!req?.roles) {
            return res.status(401).json({ error: 'Sin Autorización: No tiene roles asignados' });
        }

        // Verificar si el usuario tiene al menos uno de los roles permitidos
        const hasRole = req.roles.some(role => allowedRoles.includes(role));

        if (!hasRole) {
            return res.status(403).json({ error: 'Sin privilegios para esta operación' });
        }

        // Continuar con el siguiente middleware
        next();
    };
};