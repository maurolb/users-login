import { Router } from 'express'
import userController from '../controllers/usersController'


const router = Router()

router.get('/', userController.verifyToken, userController.listUsers)
router.get('/:id', userController.verifyToken, userController.listOneUser)
router.post('/', userController.verifyToken, userController.createUser)
router.delete('/:id', userController.verifyToken, userController.deleteUser)
router.put('/:id', userController.verifyToken, userController.updateUser)

// actualizar contraseña
router.put('/changepass', userController.verifyToken, userController.changePassword)


export default router