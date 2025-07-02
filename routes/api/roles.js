import express from 'express';
const router = express.Router();
import rolesController from '../../controllers/rolesControllers.js';
import {verifyRoles} from '../../middleware/verifyRoles.js';

router.route('/')
    .get(verifyRoles('superAdmin'),  rolesController.getAllRoles)
    .delete(verifyRoles('superAdmin'), rolesController.deleteRoles);

router.route('/:rolesList')
    .get(verifyRoles('superAdmin'), rolesController.getRolesList);

export default router;