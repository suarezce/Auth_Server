import express from 'express';
const router = express.Router();

import employeesController from '../../controllers/employeesController.js';
import {verifyRoles} from '../../middleware/verifyRoles.js';

router.route('/')
    .get(employeesController.getAllEmployees)
    .post(verifyRoles('user'), employeesController.createNewEmployee)
    .put(verifyRoles('user'), employeesController.updateEmployee)
    .delete(verifyRoles('user'), employeesController.deleteEmployee);

router.route('/:id')
    .get(employeesController.getEmployee);

export default router;