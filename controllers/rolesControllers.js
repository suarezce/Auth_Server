import mongoose from 'mongoose';
import Roles from '../model/roles.js';

export const getAllRoles = async (req, res) => {
    try {
        const roles = await Roles.find();
        if (!roles) return res.status(204).json({ 'message': 'No roles found' });
        res.json(roles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createRoles = async (req, res) => {
    const { rol, descripcion, Admin, Editor, Consultor } = req.body;

    // Validar que se hayan proporcionado los campos necesarios
    if (!rol || !descripcion || Admin === undefined || Editor === undefined || Consultor === undefined) {
        return res.status(400).json({ "message": 'All fields are required' });
    }

    try {
        const newRole = new Roles({
            Rol: rol,
            descripcion: descripcion,
            Admin: Admin,
            Editor: Editor,
            Consultor: Consultor
        });
        const savedRole = await newRole.save();
        res.status(201).json(savedRole);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateRoles = async (req, res) => {
    const { id } = req.params; // Obtener el ID del rol desde los parámetros de la ruta
    const updateData = req.body;

    // Validar que el ID sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Role ID is not valid' });
    }

    try {
        const updatedRole = await Roles.findByIdAndUpdate(
            id,
            { $set: updateData },  // Actualiza solo los campos enviados
            { 
                new: true, 
                runValidators: true,
                context: 'query'  // Necesario para validar solo campos actualizados
            }
        );

        if (!updatedRole) {
            return res.status(404).json({ 'message': `Role ID ${id} not found` });
        }

        res.json(updatedRole);
    } catch (error) {
        // Manejar errores de validación de esquema específicos
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }

        // Manejar otros errores genéricos
        res.status(500).json({ message: error.message });
    }
};

export const deleteRoles = async (req, res) => {
    const { id } = req.params; // Obtener el ID del rol desde los parámetros de la ruta

    // Validar que el ID sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Role ID is not valid' });
    }

    try {
        const role = await Roles.findById(id).exec();
        if (!role) {
            return res.status(404).json({ 'message': `Role ID ${id} not found` });
        }
        const result = await Roles.deleteOne({ _id: id });
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getRolesList = async (req, res) => {
    const rolesArray = req.params.rolesList.split(',');

    if (!req?.params?.rolesList) return res.status(400).json({ "message": 'Roles List required' });

    try {
        const resultados = await Roles.find(
            { Rol: { $in: rolesArray } },  // Filtro
            { _id: 1 } // Proyección (solo devuelve el _id)
        );

        const roles = resultados.map(doc => doc._id.toString());

        if (roles.length === 0) {
            return res.status(204).json({ 'message': `No roles found for the provided list` });
        }
        res.json(roles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const rolesController = {
    getAllRoles,
    createRoles,
    updateRoles,
    deleteRoles,
    getRolesList
};

export default rolesController;