import { Router } from 'express'
import { cookieJwtAuth } from '@middlewares/auth'
import { userController } from '@config/userControllerWithDao'
import { uploadAvatar } from '@middlewares/upload'

const NetworkUser = Router()

NetworkUser.get('/:id', cookieJwtAuth, userController.show)

NetworkUser.patch('/:id', cookieJwtAuth, uploadAvatar, userController.update)

export { NetworkUser }
