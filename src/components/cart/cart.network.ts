import { cartController } from '@config/cartControllerWithDao'
import { authUser, checkUserID, cookieJwtAuth } from '@middlewares/auth'
import { Router } from 'express'

const NetworkCart = Router()

// NetworkCart.use(authUser)
// NetworkCart.use(checkUserID)

NetworkCart.get('/:id', cookieJwtAuth, cartController.findCartById)

NetworkCart.post('/:id', cookieJwtAuth, cartController.addProduct)

NetworkCart.patch('/:id', cookieJwtAuth, cartController.removeProduct)

NetworkCart.delete('/:id', cookieJwtAuth, cartController.deleteAllProducts)

export { NetworkCart }
