// Verificación de Roles

export const verifyRoles = (...allowedRoles) => {


    return (req, res, next) => {

        console.log("roles del usuario :", req.roles )

        if (!req?.roles) return res.status(401).json('no tiene roles asignado');
        const rolesArray = [...allowedRoles];
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
        if (!result) return res.status(403).json("sin privilegios");
        next();
        
    }

}
