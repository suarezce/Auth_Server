import express from 'express';
const router = express.Router();
import registerController from '../controllers/registerController.js';
import { verifyRoles } from '../middleware/verifyRoles.js';
//import { verifyJWT } from '../middleware/verifyJWT.js';



router.post('/', verifyRoles('superAdmin'),  registerController.handleNewUser);

export default router;