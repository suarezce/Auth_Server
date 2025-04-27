import {Schema, model} from 'mongoose';
// const Schema = mongoose.Schema;

const rolSchema = new Schema({
    Rol : {
        type : String,
        required : true
    },
    Admin : Number,
    Editor : Number,
    Consultor : Number 

});

const Roles = model('Roles', rolSchema);
export default Roles;