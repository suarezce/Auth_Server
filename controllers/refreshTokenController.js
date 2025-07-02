import User from '../model/user.js';
import jwt from 'jsonwebtoken';

export const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;

    console.log(`refreshToken JWT ${cookies.jwt}`)

    if (!cookies?.jwt) {
        return res.status(401).json({ message: 'Sin autorización' });
    }

    const refreshToken = cookies.jwt;

    try {
        const foundUser = await User.findOne({ refreshToken }).populate("roles");

        if (!foundUser) {
            return res.status(403).json({ message: 'No autenticado' });
        }

        const tokenRoles = foundUser.roles.map(doc => doc.Rol);

        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err || foundUser.username !== decoded.username) {
                    return res.status(403).json({ message: 'No autenticado' });
                }

                const accessToken = jwt.sign(
                    {
                        UserInfo: {
                            username: decoded.username,
                            roles: tokenRoles
                        }
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '10m' }
                );

                res.json({ roles: tokenRoles, accessToken });
            }
        );
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error refresh' });
    }
};

const refreshTokenController = { handleRefreshToken };
export default refreshTokenController;