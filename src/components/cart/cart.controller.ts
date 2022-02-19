import { Resp, SM } from '@config/handleResp'
import { ICartStore, IProduct } from '@types'
import { Request, Response } from 'express'
import { isValidObjectId } from 'mongoose'
import CartDTO from './dto/cart.dto'
import Helper from '@helpers/helper'
import Core from '@core/index'
import HelperController from '@helpers/helperController'

class CartController {
  private store: ICartStore
  constructor(store: ICartStore) {
    this.store = store
  }

  findCartById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      if (!isValidObjectId(id)) {
        throw SM.sendMessageError('invalidParam')
      }
      const cart = await this.store.findById(id)

      Resp.success({
        res,
        clientMsg: SM.sendMessageOk('success'),
        data: new CartDTO(cart),
      })
    } catch (error: any) {
      Helper.logError(error, '[Cart - findCartById]')
      Resp.error({
        res,
        err: error,
      })
    }
  }

  addProduct = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const { product_id } = req.body

      if (!Helper.isValidID(id)) {
        throw SM.sendMessageError('invalidParam')
      }
      if (!Helper.isValidID(product_id)) {
        throw SM.sendMessageError('invalidParam')
      }

      const foundProduct = await HelperController.findProduct(product_id)

      const product = Core.productForCart(foundProduct)

      await this.store.addProductToCart(id, product)

      Resp.success({
        res,
        clientMsg: SM.sendMessageOk('newProductAdded'),
        data: '',
      })
    } catch (error: any) {
      Helper.logError(error, '[Cart - addProduct]')
      Resp.error({
        res,
        err: error,
      })
    }
  }

  removeProduct = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const { _idInCart } = req.body
      await this.store.removeProductFromCart(id, _idInCart)
      Resp.success({
        res,
        clientMsg: SM.sendMessageOk('success'),
        data: '',
      })
    } catch (error: any) {
      Helper.logError(error, '[Cart - removeProduct]')
      Resp.error({
        res,
        err: error,
      })
    }
  }

  deleteAllProducts = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      await this.store.deleteAllProducts(id)
      Resp.success({
        res,
        clientMsg: SM.sendMessageOk('deleteCartOk'),
        data: '',
      })
    } catch (error: any) {
      Helper.logError(error, '[Cart - deleteAllProducts]')
      Resp.error({
        res,
        err: error,
      })
    }
  }

  getCart = async (id: string) => {
    const cart = await this.store.findById(id)
    return cart
  }

  deleteAllProductsAfterPay = async (id: string): Promise<void> => {
    await this.store.deleteAllProducts(id)
  }
}

export default CartController
