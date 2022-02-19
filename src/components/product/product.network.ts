import { productController } from '@config/productControllerWithDao'
import { authIsAdmin, authUser, cookieJwtAuthAdmin } from '@middlewares/auth'
// import { isValidParam } from '@middlewares/isValidParam'
import { uploadImageForProduct } from '@middlewares/upload'
import { Router } from 'express'

const NetworkProduct = Router()

// NetworkProduct.use(authUser)

NetworkProduct.get('/', productController.getAllProduts)

NetworkProduct.post('/', cookieJwtAuthAdmin, uploadImageForProduct, productController.addOneProduct)

NetworkProduct.get('/:idCategory', productController.getProductByParam)

NetworkProduct.patch('/:id', cookieJwtAuthAdmin, uploadImageForProduct, productController.updateProduct)

NetworkProduct.delete('/:id', cookieJwtAuthAdmin, productController.deleteProduct)

export { NetworkProduct }
