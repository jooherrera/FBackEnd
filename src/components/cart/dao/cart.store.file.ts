import { ICart, ICartStore, productForCart } from '@types'

class CartStoreFile implements ICartStore {
  createCart(cart: ICart): Promise<void> {
    return new Promise((resolve, reject) => {})
  }
  findById(id: string): Promise<ICart> {
    return new Promise((resolve, reject) => {})
  }
  addProductToCart(id: string, product: productForCart): Promise<void> {
    return new Promise((resolve, reject) => {})
  }
  removeProductFromCart(cart_id: string, produc_id: string): Promise<void> {
    return new Promise((resolve, reject) => {})
  }
  deleteAllProducts(cart_id: string): Promise<void> {
    return new Promise((resolve, reject) => {})
  }
}

export default new CartStoreFile()
