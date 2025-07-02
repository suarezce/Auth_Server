import User from '../model/user.js';
import Roles from '../model/roles.js';
import bcrypt from 'bcryptjs';

export const handleNewUser = async (req, res) => {
    const { username, password, rolesName } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'El username y la contraseña son requeridos.' });
    }

    try {
        // Verificar si ya existe un usuario con el mismo username en la base de datos
        const duplicate = await User.findOne({ username }).exec();
        if (duplicate) {
            return res.status(409).json({ message: 'Ya existe un usuario con ese username.' });
        }

        // Encriptar la contraseña
        const hashedPwd = await bcrypt.hash(password, 10);

        // Crear y guardar el nuevo usuario
        const nUser = new User({
            username,
            password: hashedPwd
        });

        if (rolesName) {
            const foundRoles = await Roles.find({ Rol: { $in: rolesName } });
            nUser.roles = foundRoles.map(rol => rol._id);
        } else {
            const rol = await Roles.findOne({ Rol: "user" });
            nUser.roles = [rol._id];
        }

        const result = await nUser.save();
        console.log(result);

        res.status(201).json({ success: `Nuevo usuario ${nUser.username} creado exitosamente!` });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error interno del servidor al registrar' });
    }
};

export const changePassword = async (req, res) => {
    const { userId, oldPassword, newPassword } = req.body;
    if (!userId || !oldPassword || !newPassword) {
        return res.status(400).json({ message: 'Se requieren User ID, contraseña actual y nueva contraseña.' });
    }

    try {
        const foundUser = await User.findById(userId);

        if (!foundUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const match = await bcrypt.compare(oldPassword, foundUser.password);
        if (!match) {
            return res.status(401).json({ message: 'La contraseña actual es incorrecta' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        foundUser.password = hashedPassword;
        await foundUser.save();

        res.json({ message: 'Contraseña cambiada exitosamente' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const resetPassword = async (req, res) => {
    const { username, newPassword } = req.body;
    if (!username || !newPassword) {
        return res.status(400).json({ message: 'Se requieren username y nueva contraseña.' });
    }

    try {
        const foundUser = await User.findOne({ username });

        if (!foundUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        foundUser.password = hashedPassword;
        await foundUser.save();

        res.json({ message: 'Contraseña restablecida exitosamente' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const registerController = { handleNewUser, changePassword, resetPassword };
export default registerController;