import User from '../model/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    const foundUser = await User.findOne({ username: user }).populate("roles");

    //console.log("foundUser :", foundUser)

    const tokenRoles = foundUser?.roles.map(doc => doc.Rol)

    //console.log("tokenRoles :", tokenRoles)

    if (!foundUser) return res.sendStatus(401); //Unauthorized 

    // evaluate password 
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        const roles = foundUser?.roles.map(doc => doc.Rol)
        // create JWTs

        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '10s' }
        );
 
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // Saving refreshToken with current user
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log("foundToken :", foundUser);
    //    console.log(roles);

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: false, sameSite: 'Lax', maxAge: 24 * 60 * 60 * 1000 });   //  

        // Send authorization roles and access token to user
        res.json({user,  roles, accessToken });

    } else {
        res.sendStatus(401);
    }
}

const authController = {handleLogin}
export default authController