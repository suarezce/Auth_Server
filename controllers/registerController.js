import User from '../model/user.js';
import Roles from '../model/roles.js';
import bcrypt from 'bcryptjs';

export const handleNewUser = async (req, res) => {
    const { username, password, rolesName } = req.body;
    if (!username || !password) return res.status(400).json({ 'message': 'Username and password are required.' });

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ username: username }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 

/*     try { */
        //encrypt the password
       // const hashedPwd = await bcrypt.hash(pwd, 10);

        //create and store the new user
        const nUser = new User({
            username,
            password: await User.encriptPassword(password)
        });

        if (rolesName) {
            const foundRoles = await Roles.find({ Rol: { $in: rolesName } });
            nUser.roles = foundRoles.map(rol => rol._id)

            console.log(nUser.roles)
        }
        else {
            const rol = await Roles.findOne({ Rol: "User" });
        
            nUser.roles = [rol._id]
            console.log(rol._id)
        }

        const result = await nUser.save();

        console.log(result);

        res.status(201).json({ 'success': `New user ${nUser.username} created!` });
        
/*     } catch (err) {
        res.status(500).json({ 'message': err.message });
    } */
}

const registerController = { handleNewUser }

export default registerController; 


