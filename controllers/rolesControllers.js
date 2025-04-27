import Roles from '../model/roles.js';

export const getAllRoles = async (req, res) => {

    const roles = (await Roles.find());
    if (!roles) return res.status(204).json({ 'message': 'No roles found' });
    res.json(roles);
}

export const deleteRoles = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ "message": 'Roles ID required' });
    const roles = await Roles.findOne({ _id: req.body.id }).exec();
    if (!roles) {
        return res.status(204).json({ 'message': `Rol ID ${req.body.id} not found` });
    }
    const result = await Roles.deleteOne({ _id: req.body.id });
    res.json(result);
}

export const getRolesList = async (req, res) => {

   // console.log(req.params)

    console.log("req.roles:" , req.roles)

    const rolesArray = req.params.rolesList.split(',')

    console.log("roles :", rolesArray)


    if (!req?.params?.rolesList) return res.status(400).json({ "message": 'Roles List required' });
    const resultados = await Roles.find(
        { Rol: { $in: rolesArray } },  // Filtro
        { _id: 1 } // Proyección (solo devuelve el _id)
    );

   // console.log(resultados)

    const roles = resultados.map(doc => doc._id.toString())

    if (!roles) {
        return res.status(204).json({ 'message': `Rol ID ${req.params.id} not found` });
    }
    res.json(roles);

}

const rolesController = {   getAllRoles,
                            deleteRoles,
                            getRolesList
                              }

export default rolesController