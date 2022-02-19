import productStoreMongo from '@components/product/dao/product.store.mongo'
import ProductController from '@components/product/product.controller'
import Env from './env'
let productController: ProductController

switch (Env.DATABASENAME) {
  case 'mongo':
    productController = new ProductController(productStoreMongo)
    break

  default:
    productController = new ProductController(productStoreMongo)
    break
}

export { productController }
