import { Schema, model, trusted } from 'mongoose';
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
    direccion: {
        type: String,
        required: true
    },
    fechanac: {
        type: Date,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    fechaing:{
        type: String,
        required: true
    },
    cargo: {
        type: String
    },
    imagen: {
        type: String
    }
});

const Employee = model('Employee', employeeSchema);
export default Employee;