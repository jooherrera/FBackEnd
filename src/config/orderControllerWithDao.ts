import orderStoreMongo from '@components/order/dao/order.store.mongo'
import OrderController from '@components/order/order.controller'
import Env from '@config/env'

let orderController: OrderController

switch (Env.DATABASENAME) {
  case 'mongo':
    orderController = new OrderController(orderStoreMongo)
    break
  default:
    orderController = new OrderController(orderStoreMongo)
    break
}

export { orderController }
