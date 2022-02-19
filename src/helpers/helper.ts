import { dataForUpdate, IBodyProduct, Info, IPayMethod, productForCart } from '@types'
import { Logger } from '@config/logger'
import bcryptjs from 'bcryptjs'

export const isDevelopment = (environment: string): boolean => {
  return environment === 'dev'
}

export const getProperty = (object: any, prop: string): string => {
  const property = Object.entries(object)
    .filter((key) => key[0] === prop)
    .flat()[1]
  return typeof property === 'string' ? property : ''
}

export const isComplete = (element: any): boolean => element !== ''

export const isUserInfoComplete = (info: Info): boolean => {
  return Object.keys(info).every((key) => isComplete(info[key]))
}

export const isSomeEmpty = (...elements: any[]): boolean => {
  return elements.some(isEmpty)
}

export const isIdentical = (password: string, passwordWithHash: string): boolean => {
  return bcryptjs.compareSync(password, passwordWithHash)
}

export const logError = (error: any, from: string): void => {
  if (!error.clientMsg && error.serverMsg) {
    Logger.msg.error(`${error.from} -- ${error.serverMsg}`)
  }
  if (!error.clientMsg && !error.serverMsg) {
    Logger.msg.error(`${from} -- ${error.message}`)
  }
}

export const getUpdateFields = (data: dataForUpdate, avatarUrl: string) => {
  let info: any = new Set()
  Object.keys(data).forEach((key) => {
    info[`info.${key}`] = data[key]
  })

  let infoUpdate = {
    ...info,
  }

  if (avatarUrl !== '') {
    infoUpdate = {
      ...info,
      avatar: avatarUrl,
    }
  }

  return infoUpdate
}
/* ----------------------------------- -- ----------------------------------- */

const checkEmpty = (body: IBodyProduct): boolean => {
  const { name, description, category, price, stock } = body
  return isSomeEmpty(name, description, category, price, stock)
}

export const orderItemsByQuantity = (products: productForCart[]) => {
  const mapped = products.map((product) => product.producto)
  const newObject = mapped.reduce((acc: any, el) => {
    if (acc[el]) {
      acc[el]++
    } else {
      acc[el] = 1
    }
    return acc
  }, {})
  return newObject
}
export const calculatePrice = (availableMethods: any, method: string): number => {
  let price: number = -1
  Object.keys(availableMethods).map((available) => {
    if (available === method) {
      price = availableMethods[method]
    }
  })
  return price
}

export const calculateTotalPrice = (): number => {
  return -1
}

export const findQuality = (id: string, products: any): number => {
  let int: any
  Object.entries(products).forEach(([key, value]) => {
    if (key === id) {
      int = value
    }
  })
  return int
}

const simulatePayment = async (payMethod: string): Promise<boolean> => {
  return await new Promise(async (resolve) => {
    if (payMethod === 'mercadoPago') {
      setTimeout(() => {
        return resolve(true)
      }, 2000)
    } else {
      return resolve(false)
    }
  })
}

const equalsStrings = (str: string, compareTo: string) => {
  return str === compareTo
}

const isEmpty = (element: any): boolean => element === undefined || element === ''

const Helper = {
  orderItemsByQuantity,
  calculatePrice,
  calculateTotalPrice,
  findQuality,
  simulatePayment,
  equalsStrings,
  checkEmpty,
  isEmpty,
}

export default Helper
