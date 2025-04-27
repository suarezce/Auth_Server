
import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    roles: [{
        type : Schema.Types.ObjectId,
        ref: "Roles"
    }],
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
    }
},
{
    timestamps: true,
    versionKey: false
});

userSchema.statics.encriptPassword = async (password) => {

    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt)

};

userSchema.statics.verifyPassword = async (password, hashPassword ) => {

    return await bcrypt.compare(password, hashPassword)

};

const User = model('User', userSchema);
export default User;