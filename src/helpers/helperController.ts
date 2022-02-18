import { orderController } from '@config/orderControllerWithDao'
import { cartController } from '@config/cartControllerWithDao'
import { productController } from '@config/productControllerWithDao'
import { userController } from '@config/userControllerWithDao'
import { authController } from '@config/authControllerWithDao'
import { IOrderProducts, productForCart } from '@types'

import Helper from './helper'

const findProduct = async (id: string) => {
  return await productController.getProductById(id)
}

const getAllProductsInCart = async (id: string) => {
  const cart = await cartController.getCart(id)
  const productList = Helper.orderItemsByQuantity(cart.products)

  return productList
}

const getProducts = async (id: string) => {
  const cart = await cartController.getCart(id)
  return cart.products
}

const getUserAddress = async (id: string) => {
  const user = await userController.getUser(id)
  const address = {
    address: user.info.address,
  }
  return address
}

const getPartialPrice = async (products: any): Promise<number> => {
  const productsInDB = Object.keys(products).map((product_id) => product_id)
  const listOfProducts = await Promise.all(
    productsInDB.map(async (item) => {
      const product = await findProduct(item)
      return {
        id: String(product._id),
        price: product.price,
      }
    })
  )

  const partialPrice = listOfProducts
    .map((item) => {
      const qty = Helper.findQuality(item.id, products)
      return item.price * qty
    })
    .reduce((acc, el) => (acc += el))
  return partialPrice
}

const updateStock = async (products: any): Promise<void> => {
  console.log(products)
  await Promise.all(
    products.map((item: any) => {
      Object.entries(item).forEach(async ([value, key]) => {
        await productController.updateStock(value, Number(key))
      })
    })
  )
  // await productController.updateStock()
}

const deleteProductsFromCart = async (id: string): Promise<void> => {
  await cartController.deleteAllProductsAfterPay(id)
}

const HelperController = {
  findProduct,
  getAllProductsInCart,
  getUserAddress,
  getPartialPrice,
  updateStock,
  deleteProductsFromCart,
  getProducts,
}
export default HelperController
