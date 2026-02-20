import express from 'express';
const router = express.Router();
import usersController from '../../controllers/usersController.js';
import { verifyRoles } from '../../middleware/verifyRoles.js';

// Rutas para obtener todos los usuarios y eliminar un usuario por ID
router.route('/')
    .get(verifyRoles('loginAdmin', 'masterAdmin', 'user'), usersController.getAllUsers)


// Rutas para obtener un usuario por ID y actualizar un usuario por ID
router.route('/:id')
    .get(verifyRoles('loginAdmin'), usersController.getUser)
    .patch(verifyRoles('loginAdmin'), usersController.updateUser) // Nueva ruta para actualizar un usuario
    .delete(verifyRoles('loginAdmin'), usersController.deleteUser); // Borrar usuario por id

export default router;