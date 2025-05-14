import User from '../model/user.js';
import jwt from 'jsonwebtoken';

export const handleRefreshToken = async (req, res) => {

    const cookies = req.cookies;

    console.log(req.cookies)

    console.log('Refresh token recibido:', req.cookies.jwt);

    console.log("jwt : ", req.cookies)

    if (!cookies.jwt) return res.sendStatus(401);

    const refreshToken = cookies.jwt;

    console.log(refreshToken)

    const foundUser = await User.findOne({ refreshToken }).populate("roles");;

    console.log("foundUser :", foundUser)

    const tokenRoles = foundUser?.roles.map(doc => doc.Rol)

    console.log("tokenRoles :", tokenRoles)

    if (!foundUser) return res.sendStatus(403); //Forbidden 
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
            const roles = foundUser?.roles.map(doc => doc.Rol)
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": decoded.username,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '10s' }
            );
            res.json({ roles, accessToken })
            console.log(accessToken)

        }
    );
}

const refreshTokenController = {handleRefreshToken};
export default refreshTokenController;