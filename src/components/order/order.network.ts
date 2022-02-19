import { orderController } from '@config/orderControllerWithDao'
import { cookieJwtAuth } from '@middlewares/auth'
import { Router } from 'express'

const NetworkOrder = Router()

NetworkOrder.post('/:id', cookieJwtAuth, orderController.generateOrder)

NetworkOrder.get('/:id', cookieJwtAuth, orderController.getAllOrder)

export { NetworkOrder }
