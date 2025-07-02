import User from '../model/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) {
        return res.status(400).json({ message: 'Username y password son requeridos.' });
    }

    try {
        const foundUser = await User.findOne({ username: user }).populate("roles");

        if (!foundUser) {
            return res.status(401).json({ message: 'Sin autorización' });
        }

        const match = await bcrypt.compare(pwd, foundUser.password);
        if (!match) {
            return res.status(401).json({ message: 'Sin autorización' });
        }

        const roles = foundUser.roles.map(doc => doc.Rol);

        const accessToken = jwt.sign(
            { UserInfo: { username: foundUser.username, roles } },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );

        const refreshToken = jwt.sign(
            { username: foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        foundUser.refreshToken = refreshToken;
        await foundUser.save();

/*         res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'Lax', maxAge: 24 * 60 * 60 * 1000 }); */

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'Lax',
            maxAge: 24 * 60 * 60 * 1000 ,
            secure: process.env.NODE_ENV === 'production' // Solo en producción
        });



        res.json({ user: foundUser.username, roles, accessToken });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error auth' });
    }
};

const authController = { handleLogin };
export default authController;
