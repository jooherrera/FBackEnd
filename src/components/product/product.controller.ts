import { Resp, SM } from '@config/handleResp'
import { logError } from '@helpers/helper'
import Core from '@core/index'
import { IProductStore } from '@types'
import { Request, Response } from 'express'
import ProductDTO from './dto/product.dto'
import { getParam } from '@helpers/getParam'
import { noInfoForUpdate } from '@helpers/noInfoForUpdate'
import Env from '@config/env'

class ProductController {
  private store: IProductStore
  constructor(store: IProductStore) {
    this.store = store
  }

  getAllProduts = async (req: Request, res: Response) => {
    try {
      const products = await this.store.findAll()

      Resp.success({
        res,
        clientMsg: SM.sendMessageOk('success'),
        data: products.map((product) => new ProductDTO(product)),
      })
    } catch (error: any) {
      logError(error, '[Product - getAllProduts]')
      Resp.error({
        res,
        err: error,
      })
    }
  }

  addOneProduct = async (req: Request, res: Response) => {
    try {
      const newProduct = Core.newProduct({ ...req.body, imageFile: req.file })

      await this.store.add(newProduct)

      Resp.success({
        res,
        clientMsg: SM.sendMessageOk('newProductAdded'),
        data: '',
      })
    } catch (error: any) {
      logError(error, '[Product - addOneProduct]')
      Resp.error({
        res,
        err: error,
      })
    }
  }

  getProductByParam = async (req: Request, res: Response) => {
    try {
      const { idCategory } = req.params

      const param = getParam(idCategory)

      const product = await this.store.findByParam(param)

      Resp.success({
        res,
        clientMsg: SM.sendMessageOk('success'),
        data: product.map((prod: any) => new ProductDTO(prod)),
      })
    } catch (error: any) {
      logError(error, '[Product - getProductByParam]')
      Resp.error({
        res,
        err: error,
      })
    }
  }

  updateProduct = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const imgName = req.file?.filename
      const fieldsForUpdate = req.body
      // const param = getParam(id)
      if (noInfoForUpdate(fieldsForUpdate, imgName)) {
        Resp.success({
          res,
          clientMsg: SM.sendMessageOk('noFieldsForUpdate'),
          data: '',
        })
        return
      }

      if (imgName) {
        await this.store.update(id, { ...fieldsForUpdate, imageURL: `${Env.DIR_PRODUCTS}${imgName}` })
      } else {
        await this.store.update(id, { ...fieldsForUpdate })
      }

      Resp.success({
        res,
        clientMsg: SM.sendMessageOk('updateOk'),
        data: '',
      })
    } catch (error: any) {
      logError(error, '[Product - updateProduct]')
      Resp.error({
        res,
        err: error,
      })
    }
  }

  deleteProduct = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      await this.store.delete(id)
      Resp.success({
        res,
        clientMsg: SM.sendMessageOk('deleteOk'),
        data: '',
      })
    } catch (error: any) {
      logError(error, '[Product - deleteProduct]')
      Resp.error({
        res,
        err: error,
      })
    }
  }

  getProductById = async (id: string) => {
    return await this.store.findProductById(id)
  }

  updateStock = async (id: string, qty: number) => {
    return await this.store.updateStock(id, qty)
  }
}

export default ProductController
