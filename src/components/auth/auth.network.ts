import { Router } from 'express'
import { authController } from '@config/authControllerWithDao'
import { addTokenToBlockList, authUser, cookieJwtAuth } from '@middlewares/auth'

const NetworkAuth = Router()

// NetworkAuth.get('/', cookieJwtAuth, authController.dashBoard)
NetworkAuth.get('/', authController.home)

NetworkAuth.get('/login', authController.loginView)

NetworkAuth.get('/register', authController.registerView)

NetworkAuth.post('/register', authController.register)

NetworkAuth.post('/login', authController.login)

NetworkAuth.get('/logout', addTokenToBlockList, authController.logOut)

export { NetworkAuth }
