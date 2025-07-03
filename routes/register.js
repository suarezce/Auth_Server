import express from 'express';
const router = express.Router();
import registerController from '../controllers/registerController.js';
import { verifyRoles } from '../middleware/verifyRoles.js';


router.post('/', verifyRoles('loginAdmin'),  registerController.handleNewUser);
router.post('/resetPassword', verifyRoles('loginAdmin'), registerController.resetPassword )


export default router;