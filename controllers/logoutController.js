import User from '../model/user.js';

export const handleLogout = async (req, res) => {
    // On client, also delete the accessToken

    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.sendStatus(204); // No content
    }

    const refreshToken = cookies.jwt;

    try {
        // Is refreshToken in db?
        const foundUser = await User.findOne({ refreshToken }).exec();
        if (!foundUser) {
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None' }); // secure: true
            return res.status(202).json({ message: 'Usuario Logout!' });
        }

        // Delete refreshToken in db
        foundUser.refreshToken = '';
        const result = await foundUser.save();
        console.log(result);

        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None' }); // secure: true
        res.status(202).json({ message: 'Usuario Logout!' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error logout' });
    }
};

const logoutController = { handleLogout };
export default logoutController;