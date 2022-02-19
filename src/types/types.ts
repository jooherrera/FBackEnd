import { JwtPayload } from 'jsonwebtoken'
import { Types } from 'mongoose'
/* ---------------------------------- CHAT ---------------------------------- */
export interface IChatStore {
  addNewMessage(msg: IMessage): Promise<void>
  getUserChat(email: string): Promise<IMessage[] | []>
  getAll(): Promise<IMessage[]>
}

export interface IChat {
  user: string
  messages: {
    sennder: string
    message: string
    sendAt: string
  }[]
}

export interface IUpdateMessage {
  user: string
  messages: {
    sennder: string
    message: string
    sendAt: string
  }
}

export interface IMessage {
  user: string
  sennder: string
  message: string
  sendAt: string
}

export interface IMessageFromClient {
  user: string
  sennder: string
  message: string
}

/* ---------------------------------- CORE ---------------------------------- */
export interface IPayMethod {
  [key: string]: any
  efectivo: number
  mercadoPago: number
}
export interface IShippingMethod {
  [key: string]: any
  local: number
  correo: number
}
/* ---------------------------------- ORDER --------------------------------- */

export interface IOrderStore {
  registerOrder(order: IOrder): Promise<void>
  getAllOrder(id: string): Promise<IOrder[]>
}

export interface IShippingAddress {
  address: string
}

export interface IOrder {
  _id?: Types.ObjectId
  user: string
  // orderItems: IOrderProducts[]
  orderItems: any[]
  shippingAddress: IShippingAddress
  payMethod: string
  taxPrice: number
  shippingMethod: string
  shippingPrice: number
  totalPrice: number
  isPaid: boolean
  paidAt: string
  isDelivered: boolean
  deliveredAt: string
  createdTime: string
}

export interface IOrderProducts {
  [key: string]: any
  producto_id: string
  quantity: number
}

/* ---------------------------------- CART ---------------------------------- */
export interface ICartStore {
  createCart(cart: ICart): Promise<void>
  findById(id: string): Promise<ICart>
  addProductToCart(id: string, product: productForCart): Promise<void>
  removeProductFromCart(cart_id: string, _idInCart: string): Promise<void>
  deleteAllProducts(cart_id: string): Promise<void>
}

export interface productForCart {
  [key: string]: any
  _idInCart: string
  producto: string
  name: string
  description: string
  price: number
}

export interface ICart {
  _id?: Types.ObjectId
  authId: string
  products: productForCart[]
}

export interface ICartDto {
  user: string
  products: productForCart[]
}

/* --------------------------------- PRODUCT -------------------------------- */
export interface IProductStore {
  add(product: IProduct): Promise<void>
  findAll(): Promise<IProduct[]>
  findByParam(category: IParam): Promise<IProduct[] | IProduct>
  update(id: string, productFields: IProduct): Promise<void>
  delete(id: string): Promise<void>
  findProductById(id: string): Promise<IProduct>
  updateStock(id: string, qty: number): Promise<void>
}

export interface I_ID {
  _id: Types.ObjectId
}

export interface IParam {
  _id?: string
  category?: string
}

export interface IProduct {
  [key: string]: any
  _id?: I_ID
  name: string
  description: string
  category: string
  imageFile?: Express.Multer.File
  imageURL: string
  price: number
  stock: number
}

export interface IProductDTO {
  name: string
  description: string
  category: string
  imageURL: string
  price: number
  stock: number
}

export interface IBodyProduct {
  name: string
  description: string
  category: string
  price: number
  stock: number
}

/* ------------------------------- ENVIRONMENT ------------------------------ */
export interface IEnvironment {
  port: number
  environmentName: string
  dataBase: IDataBase
  dataBaseName: string
  dirProductImages: string
  dirAvatarImages: string
}

/* -------------------------------- DATABASE -------------------------------- */
export interface IDataBase {
  connect(uri?: string): Promise<boolean>
}

/* ---------------------------- BLOCK LIST TOKEN ---------------------------- */
export interface IBlockListStore {
  addToBlockList(token: string): Promise<void>
  isInBlockList(token: string): Promise<boolean>
}
/* ---------------------------------- AUTH ---------------------------------- */
export interface IAuth extends IDataRegister {
  _id: Types.ObjectId
  email: string
  status: string
  isAdmin: boolean
}

export interface IDataRegister {
  email: string
  password: string
}
export interface IAuthStore {
  register(data: IDataRegister): Promise<IAuth>
  findByEmail(email: string): Promise<IAuth>
  findUserById(id: string): Promise<IAuth>
  isEmailRegistered(email: string): Promise<boolean>
  updateStatus(id: string, status: string): Promise<void>
  delete(): void
}

export interface IAuthDto {
  id: Types.ObjectId
  token: string
}

/* ---------------------------------- USER ---------------------------------- */

export interface IUserStore {
  findUser(authId: string): Promise<IUserWithID>
  registerUser(emptyUser: IEmptyUser): Promise<IUserWithID>
  updateUser(authId: string, data: dataForUpdate, avatarUrl: string): Promise<boolean>
}

export interface dataForUpdate {
  [key: string]: any
  info?: Info
  avatar?: string
}

export interface Info {
  [key: string]: string
  name: string
  lastName: string
  address: string
  phone: string
}

export interface IEmptyUser {
  avatar: string
  info: Info
}

export interface IUserWithID {
  _id: Types.ObjectId
  authId: string
  info: Info
  avatar: string
}

export interface dtoUser {
  info: Info
  avatar: string
}

/* --------------------------------- GLOBAL --------------------------------- */
declare global {
  namespace Express {
    interface Request {
      user: JwtPayload
      userData: IUserWithID
    }
  }
}
declare module 'jsonwebtoken' {
  export interface JwtPayload {
    user: string
    email: string
    status: string
    isAdmin: boolean
  }
}
