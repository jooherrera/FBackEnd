import cartStoreMongo from '@components/cart/dao/cart.store.mongo'
import CartController from '@components/cart/cart.controller'
import Env from './env'

let cartController: CartController

switch (Env.DATABASENAME) {
  case 'mongo':
    cartController = new CartController(cartStoreMongo)
    break

  default:
    cartController = new CartController(cartStoreMongo)
    break
}

export { cartController }
