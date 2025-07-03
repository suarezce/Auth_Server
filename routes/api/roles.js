import express from 'express';
const router = express.Router();
import rolesController from '../../controllers/rolesControllers.js';
import {verifyRoles} from '../../middleware/verifyRoles.js';

router.route('/')
    .get(verifyRoles('loginAdmin'),  rolesController.getAllRoles)
    .post(verifyRoles('loginAdmin'),  rolesController.createRoles)

router.route('/:id')
    .patch(verifyRoles('loginAdmin'), rolesController.updateRoles)
    .delete(verifyRoles('loginAdmin'), rolesController.deleteRoles);

router.route('/list/:rolesList')
    .get(verifyRoles('loginAdmin'), rolesController.getRolesList);

export default router;