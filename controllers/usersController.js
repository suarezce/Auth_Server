import mongoose from 'mongoose';
import User from '../model/user.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().populate("roles");
        if (!users) return res.status(204).json({ 'message': 'No users found' });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    // Validar que el ID sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'User ID is not valid' });
    }

    try {
        const user = await User.findById(id).exec();
        if (!user) {
            return res.status(404).json({ 'message': `User ID ${id} not found` });
        }

        const result = await User.deleteOne({ _id: id });
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUser = async (req, res) => {
    const { id } = req.params;

    // Validar que el ID sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'User ID is not valid' });
    }

    try {
        const user = await User.findById(id).populate("roles").exec();
        if (!user) {
            return res.status(404).json({ 'message': `User ID ${id} not found` });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    // Validar que el ID sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'User ID is not valid' });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: updateData },  // Actualiza solo los campos enviados
            { 
                new: true, 
                runValidators: true,
                context: 'query'  // Necesario para validar solo campos actualizados
            }
        );

        if (!updatedUser) {
            return res.status(404).json({ 'message': `User ID ${id} not found` });
        }

        res.json(updatedUser);
    } catch (error) {
        // Manejar errores de validación de esquema específicos
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }

        // Manejar otros errores genéricos
        res.status(500).json({ message: error.message });
    }
};

const usersController = {
    getAllUsers,
    deleteUser,
    getUser,
    updateUser
};

export default usersController;