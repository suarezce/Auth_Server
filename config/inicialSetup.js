import Roles from "../model/roles.js";
import Users from "../model/user.js";

export const createRoles = async () => {

    try {

        const nroRoles = await Roles.estimatedDocumentCount()

        if (nroRoles > 0) return;

        const values = await Promise.all([
            new Roles({ Rol: "user", Admin: 1500, Editor: 2500, Consutor : 3500}).save(),
            new Roles({ Rol: "superAdmin", Admin: 1500, Editor: 2500, Consutor : 3500 }).save(),
            new Roles({ Rol: "masterAdmin", Admin: 1500, Editor: 2500, Consutor : 3500 }).save(),
            new Roles({ Rol: "contratacion", Admin: 1500, Editor: 2500, Consutor : 3500 }).save(),
            new Roles({ Rol: "administrador", Admin: 1500, Editor: 2500, Consutor : 3500 }).save(),
            new Roles({ Rol: "verificador", Admin: 1500, Editor: 2500, Consutor : 3500 }).save(),
            new Roles({ Rol: "aprobador", Admin: 1500, Editor: 2500, Consutor : 3500 }).save(),

        ])

        console.log({ values })

    } catch (error) {
        console.error(error)
    }

    const foundRoles = await Roles.find();
    const allRoles = foundRoles.map(rol => rol._id)

    const superUser = new Users({
        username: "superAdmin",
        password: await Users.encriptPassword("10953822"),
        roles: allRoles
    })

    await superUser.save()

    console.log({ superUser })

}