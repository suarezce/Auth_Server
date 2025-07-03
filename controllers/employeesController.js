import mongoose from 'mongoose';
import Employee from '../model/employee.js';

export const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        if (!employees) return res.status(204).json({ 'message': 'No employees found.' });
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createNewEmployee = async (req, res) => {
    const { firstname, lastname, email, direccion, fechanac, username, fechaing, cargo, imagen } = req.body;

    // Validar que se hayan proporcionado los campos necesarios
    if (!firstname || !lastname || !email || !direccion || !fechanac || !username || !fechaing) {
        return res.status(400).json({ "message": 'All fields are required' });
    }

    try {
        const newEmployee = new Employee({
            firstname,
            lastname,
            email,
            direccion,
            fechanac,
            username,
            fechaing,
            cargo,
            imagen
        });
        const savedEmployee = await newEmployee.save();
        res.status(201).json(savedEmployee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateEmployee = async (req, res) => {
    const { id } = req.params; // Obtener el ID del empleado desde los parámetros de la ruta
    const updateData = req.body;

    // Validar que el ID sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Employee ID is not valid' });
    }

    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            id,
            { $set: updateData },  // Actualiza solo los campos enviados
            { 
                new: true, 
                runValidators: true,
                context: 'query'  // Necesario para validar solo campos actualizados
            }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ 'message': `Employee ID ${id} not found` });
        }

        res.json(updatedEmployee);
    } catch (error) {
        // Manejar errores de validación de esquema específicos
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }

        // Manejar otros errores genéricos
        res.status(500).json({ message: error.message });
    }
};

export const deleteEmployee = async (req, res) => {
    const { id } = req.params; // Obtener el ID del empleado desde los parámetros de la ruta

    // Validar que el ID sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Employee ID is not valid' });
    }

    try {
        const employee = await Employee.findById(id).exec();
        if (!employee) {
            return res.status(404).json({ 'message': `Employee ID ${id} not found` });
        }
        const result = await Employee.deleteOne({ _id: id });
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getEmployee = async (req, res) => {
    const { id } = req.params; // Obtener el ID del empleado desde los parámetros de la ruta

    // Validar que el ID sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Employee ID is not valid' });
    }

    try {
        const employee = await Employee.findById(id).exec();
        if (!employee) {
            return res.status(404).json({ 'message': `Employee ID ${id} not found` });
        }
        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const employeesController = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
};

export default employeesController;