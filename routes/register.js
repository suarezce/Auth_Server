import express from 'express';
const router = express.Router();
import registerController from '../controllers/registerController.js';
import { verifyRoles } from '../middleware/verifyRoles.js';


router.post('/', verifyRoles('superAdmin'),  registerController.handleNewUser);
router.post('/resetPassword', verifyRoles('superAdmin'), registerController.resetPassword )


export default router;