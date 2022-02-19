import { Resp, SM } from '@config/handleResp'
import Helper, { logError } from '@helpers/helper'
import HelperController from '@helpers/helperController'
import { IOrder, IOrderProducts, IOrderStore } from '@types'
import { Request, Response } from 'express'
import Core from '@core/index'
import moment from 'moment'
import OrderDto from './dto/order.dto'
import { sendMail } from '@config/nodemailer'
import Env from '@config/env'

class OrderController {
  private store: IOrderStore
  constructor(store: IOrderStore) {
    this.store = store
  }

  generateOrder = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const { payMethod, shippingMethod } = req.body

      console.log(payMethod)
      console.log(shippingMethod)
      //Buscar todos los productos del carrito del usuario.
      const products = await HelperController.getAllProductsInCart(id)
      const productsForEmail = await HelperController.getProducts(id)
      if (Object.entries(products).length === 0) {
        throw SM.sendMessageError('emptyCart')
      }
      //Buscar la dirección a donde enviar
      const userAddress = await HelperController.getUserAddress(id)
      //TaxPrice por el metodo utilizado.
      const availablePayMethods = Core.payMethods()
      const taxPrice = Helper.calculatePrice(availablePayMethods, payMethod)
      if (taxPrice < 0) {
        throw SM.sendMessageError('invalidPayMethod')
      }
      //Metodo de envio
      const availableShippingMethods = Core.shippingMethods()
      const shippingPrice = Helper.calculatePrice(availableShippingMethods, shippingMethod)
      if (shippingPrice < 0) {
        throw SM.sendMessageError('invalidShippingMethod')
      }
      //Precio total
      //   console.log(products)
      const partialPrice = await HelperController.getPartialPrice(products)
      const totalPrice = Number((partialPrice * taxPrice + shippingPrice).toFixed(2))

      //IsPaid
      const isPaid = await Helper.simulatePayment(payMethod)

      const orderItems: any[] = []
      Object.entries(products).forEach(([key, value]) => {
        orderItems.push({ [key]: value })
      })

      const newOrder: IOrder = {
        user: id,
        shippingAddress: userAddress,
        orderItems: orderItems,
        payMethod,
        taxPrice,
        shippingMethod,
        shippingPrice,
        totalPrice,
        isPaid,
        paidAt: isPaid
          ? String(moment().locale('es-mx').format('LLL'))
          : String(moment().startOf('day').format('mm:ss')),
        isDelivered: false,
        deliveredAt: String(moment().startOf('day').format('mm:ss')),
        createdTime: String(moment().locale('es-mx').format('LLL')),
      }
      await this.store.registerOrder(newOrder)

      await HelperController.deleteProductsFromCart(id)

      //Descontar stock
      await HelperController.updateStock(orderItems)

      const mailOptions = {
        from: 'CoderShop',
        to: Env.ADMIN_EMAIL,
        subject: 'Enviado desde nodemailer',

        html: `<h5> Lista de Productos:${productsForEmail.map((item) => `<h3>${item.name}</h3>`)}</h5>
        <br>
`,
      }

      sendMail(mailOptions)

      res.render('ordenGenerada')
      // Resp.success({
      //   res,
      //   clientMsg: SM.sendMessageOk('success'),
      //   data: '',
      // })
    } catch (error: any) {
      logError(error, '[Order - generateOrder]')
      res.render('error', {
        code: error.code,
        message: error.clientMsg,
      })
      // Resp.error({
      //   res,
      //   err: error,
      // })
    }
  }

  getAllOrder = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const order = await this.store.getAllOrder(id)

      Resp.success({
        res,
        clientMsg: SM.sendMessageOk('success'),
        data: new OrderDto(order),
        // data: order,
      })
    } catch (error: any) {
      logError(error, '[Order - getAllOrder]')
      Resp.error({
        res,
        err: error,
      })
    }
  }
}

export default OrderController
