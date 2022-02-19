import { cookieJwtAuth, cookieJwtAuthAdmin } from '@middlewares/auth'
import { Router } from 'express'
import viewsController from './views.controller'

const ViewsNetwork = Router()

ViewsNetwork.get('/addproduct', cookieJwtAuthAdmin, viewsController.addProduct)

ViewsNetwork.get('/getAll', cookieJwtAuthAdmin, viewsController.getAll)

ViewsNetwork.get('/product/update/:id', cookieJwtAuthAdmin, viewsController.updateProduct)

ViewsNetwork.get('/user/update/:id', cookieJwtAuth, viewsController.updateUser)

ViewsNetwork.get('/carrito', cookieJwtAuth, viewsController.carrito)

ViewsNetwork.get('/order', cookieJwtAuth, viewsController.order)

ViewsNetwork.get('/miscompras', cookieJwtAuth, viewsController.getOrders)

export { ViewsNetwork }
