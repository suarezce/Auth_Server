import User from '../model/user.js';
import Roles from '../model/roles.js';
import bcrypt from 'bcryptjs';

export const handleNewUser = async (req, res) => {
    const { username, password, rolesName } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username y password son requeridos.' });
    }

    try {
        // Check for duplicate usernames in the db
        const duplicate = await User.findOne({ username }).exec();
        if (duplicate) {
            return res.status(409).json({ message: 'Ya existe un usuario con ese username' });
        }

        // Encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);

        // Create and store the new user
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

        res.status(201).json({ success: `Nuevo usuario ${nUser.username} creado!` });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error register' });
    }
};

export const updateUser = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    const user = await User.findOne({ _id: req.body.id }).exec();
    if (!user) {
        return res.status(204).json({ "message": `No employee matches ID ${req.body.id}.` });
    }
    if (req.body?.firstname) user.firstname = req.body.firstname;
    if (req.body?.lastname) user.lastname = req.body.lastname;
    const result = await user.save();
    res.json(result);
};

const registerController = { handleNewUser, updateUser };
export default registerController;