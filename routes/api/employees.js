import express from 'express';
const router = express.Router();

import employeesController from '../../controllers/employeesController.js';
import {verifyRoles} from '../../middleware/verifyRoles.js';

router.route('/')
    .get(verifyRoles('superAdmin'), employeesController.getAllEmployees)
    .post(verifyRoles('superAdmin'), employeesController.createNewEmployee)
    .put(verifyRoles('superAdmin'), employeesController.updateEmployee)
    .delete(verifyRoles('superAdmin'), employeesController.deleteEmployee);

router.route('/:id')
    .get(verifyRoles('superAdmin'), employeesController.getEmployee);

export default router;