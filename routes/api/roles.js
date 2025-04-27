import express from 'express';
const router = express.Router();
import rolesController from '../../controllers/rolesControllers.js';
import {verifyRoles} from '../../middleware/verifyRoles.js';

router.route('/')
    .get(/* verifyRoles('user') ,  */ rolesController.getAllRoles)
    .delete(/* verifyRoles('user'),  */rolesController.deleteRoles);

router.route('/:rolesList')
    .get(/* verifyRoles('user'), */ rolesController.getRolesList);

export default router;