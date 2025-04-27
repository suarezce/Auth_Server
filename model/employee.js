import {Schema, model, trusted} from 'mongoose';
// const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type : String,
        required : true
    },
    cargo: {
        type : String
    }
});

const Employee = model('Employee', employeeSchema);
export default Employee;