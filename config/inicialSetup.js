import Roles from "../model/roles.js";
import Users from "../model/user.js"; 

export const createRoles = async () => {
    try {
        // Verificar si ya existen roles en la base de datos
        const nroRoles = await Roles.estimatedDocumentCount();
        if (nroRoles > 0) return;

        // Crear roles básicos
        const rolesData = [
            { Rol: "user", Admin: 1500, Editor: 2500, Consultor: 3500 },
            { Rol: "superAdmin", Admin: 1500, Editor: 2500, Consultor: 3500 },
            { Rol: "masterAdmin", Admin: 1500, Editor: 2500, Consultor: 3500 },
            { Rol: "contratacion", Admin: 1500, Editor: 2500, Consultor: 3500 },
            { Rol: "administrador", Admin: 1500, Editor: 2500, Consultor: 3500 },
            { Rol: "verificador", Admin: 1500, Editor: 2500, Consultor: 3500 },
            { Rol: "aprobador", Admin: 1500, Editor: 2500, Consultor: 3500 },
            { Rol: "loginAdmin", Admin: 1500, Editor: 2500, Consultor: 3500 }
        ];

        const roles = await Promise.all(rolesData.map(roleData => new Roles(roleData).save()));
        console.log('✅ Initial roles created');

        // Obtener los IDs de todos los roles creados
        const foundRoles = await Roles.find();
        const allRoles = foundRoles.map(rol => rol._id);

        // Crear superusuario
        const superUser = new Users({
            username: "superAdmin",
            password: await Users.encriptPassword("10953822"),
            roles: allRoles
        });

        await superUser.save();
        console.log('✅ Superuser creado');

    } catch (error) {
        console.error('❌ Error creando roles iniciales y superuser:', error);
        throw error; // Lanzar el error para que pueda ser manejado por el código que llama a createRoles
    }
};