import express from 'express';
const router = express.Router();
import usersController from '../../controllers/usersController.js';
import { verifyRoles } from '../../middleware/verifyRoles.js';

// Rutas para obtener todos los usuarios y eliminar un usuario por ID
router.route('/')
    .get(verifyRoles('superAdmin'), usersController.getAllUsers)


// Rutas para obtener un usuario por ID y actualizar un usuario por ID
router.route('/:id')
    .get(verifyRoles('superAdmin'), usersController.getUser)
    .patch(verifyRoles('superAdmin'), usersController.updateUser) // Nueva ruta para actualizar un usuario
    .delete(verifyRoles('superAdmin'), usersController.deleteUser); // Borrar usuario por id

export default router;