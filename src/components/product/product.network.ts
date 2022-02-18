import { productController } from '@config/productControllerWithDao'
import { authIsAdmin, authUser } from '@middlewares/auth'
// import { isValidParam } from '@middlewares/isValidParam'
import { uploadImageForProduct } from '@middlewares/upload'
import { Router } from 'express'

const NetworkProduct = Router()

// NetworkProduct.use(authUser)

NetworkProduct.get('/', productController.getAllProduts)

NetworkProduct.post('/', authIsAdmin, uploadImageForProduct, productController.addOneProduct)

NetworkProduct.get('/:idCategory', productController.getProductByParam)

NetworkProduct.patch('/:id', authIsAdmin, uploadImageForProduct, productController.updateProduct)

NetworkProduct.delete('/:id', authIsAdmin, productController.deleteProduct)

export { NetworkProduct }
