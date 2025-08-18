import express from 'express';
const router = express.Router();

import employeesController from '../../controllers/employeesController.js';
import {verifyRoles} from '../../middleware/verifyRoles.js';

router.route('/')
    .get(verifyRoles('loginAdmin', 'user'), employeesController.getAllEmployees)
    .post(verifyRoles('loginAdmin'), employeesController.createNewEmployee)



router.route('/:id')
    .get(verifyRoles('loginAdmin'), employeesController.getEmployee)
    .patch(verifyRoles('loginAdmin', 'user'), employeesController.updateEmployee)
    .delete(verifyRoles('loginAdmin'), employeesController.deleteEmployee);
export default router;