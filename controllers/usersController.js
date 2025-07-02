import User from '../model/user.js';

export const getAllUsers = async (req, res) => {
    const users = await User.find().populate("roles");
    if (!users) return res.status(204).json({ 'message': 'No users found' });
    res.json(users);
};

export const deleteUser = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'User ID required' });
    const user = await User.findOne({ _id: req.params.id }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `ID de Usuario ${req.params.id} no encontrado` });
    }
    const result = await user.deleteOne({ _id: req.params.id });
    res.json(result);
};

export const getUser = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'User ID required' });
    const user = await User.findOne({ _id: req.params.id }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.params.id} not found` });
    }
    res.json(user);
};

export const updateUser = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'User ID required' });
    const { username, roles } = req.body;
    if (!username && !roles) return res.status(400).json({ "message": 'Username or roles required' });

    const user = await User.findById(req.params.id).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.params.id} not found` });
    }

    if (username) user.username = username;
    if (roles) user.roles = roles;

    const updatedUser = await user.save();
    res.json(updatedUser);
};

const usersController = {
    getAllUsers,
    deleteUser,
    getUser,
    updateUser
};

export default usersController;