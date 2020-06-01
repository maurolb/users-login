import Router from 'express'
import AuthController from '../controllers/authController'

const router = Router()

router.post('/login', AuthController.logIn)
router.post('/register', AuthController.register)


export default router