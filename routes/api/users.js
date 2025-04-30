import express from 'express';
const router = express.Router();
import usersController from '../../controllers/usersController.js';
import {verifyRoles} from '../../middleware/verifyRoles.js';

router.route('/')
    .get(verifyRoles('user'), usersController.getAllUsers)
    .delete(verifyRoles('user'), usersController.deleteUser);

router.route('/:id')
    .get(verifyRoles('user'), usersController.getUser);

export default router;