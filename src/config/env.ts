import yargs from 'yargs/yargs'
import dotenv from 'dotenv'
import path from 'path'
import { IDataBase } from '@types'
import { selectDatabase } from '@helpers/selectDatabase'
import { exit } from 'process'

const argv = yargs(process.argv.slice(2)).parseSync()

const argv1 = (env: string | unknown) => {
  if (env === 'development') {
    return '.development'
  }
  return ''
}

dotenv.config({ path: path.resolve() + `/.env${argv1(argv.NODE_ENV)}` })

let db: IDataBase = selectDatabase(process.env.DATABASE || '')
let secret: string
let name: string
let categories: string[]
let dirProduct: string
let dirAvatar: string
let time: string
let databaseName: string
let adminEmail: string
let payMethods: string[]
let userMailer: string
let passMailer: string
let hostMailer: string
let portMailer: number

if (process.env.USERMAILER && process.env.PASSMAILER && process.env.HOSTMAILER && process.env.PORTMAILER) {
  userMailer = process.env.USERMAILER
  passMailer = process.env.PASSMAILER
  hostMailer = process.env.HOSTMAILER
  portMailer = Number(process.env.PORTMAILER)
} else {
  exit(1)
}
if (!process.env.USERMAILER || !process.env.PASSMAILER || !process.env.HOSTMAILER || !process.env.PORTMAILER) {
  exit(1)
}
if (process.env.SECRET_KEY && process.env.DATABASE) {
  secret = process.env.SECRET_KEY
  databaseName = process.env.DATABASE
} else {
  exit(1)
}

if (process.env.ENVIRONMENT && process.env.EXPIRE_TOKEN_TIME) {
  name = process.env.ENVIRONMENT
  time = process.env.EXPIRE_TOKEN_TIME
} else {
  exit(1)
}

if (process.env.CATEGORIES && process.env.ADMIN_EMAIL) {
  categories = process.env.CATEGORIES.split('|')
  adminEmail = process.env.ADMIN_EMAIL
} else {
  exit(1)
}
if (process.env.PAYMETHOD) {
  payMethods = process.env.PAYMETHOD.split('|')
} else {
  exit(1)
}

if (process.env.DIR_PRODUCTS && process.env.DIR_AVATAR) {
  dirProduct = process.env.DIR_PRODUCTS
  dirAvatar = process.env.DIR_AVATAR
} else {
  exit(1)
}

export = {
  PORT: process.env.PORT,
  NAME: name,
  DATABASE: db,
  DATABASENAME: databaseName,
  SECRET_KEY: secret,
  EXPIRE_TOKEN_TIME: time,
  ADMIN_EMAIL: adminEmail,
  CATEGORIES: categories,
  DIR_PRODUCTS: dirProduct,
  DIR_AVATAR: dirAvatar,
  PAYMETHOD: payMethods,
  HOST: process.env.HOST,
  USERMAILER: userMailer,
  PASSMAILER: passMailer,
  HOSTMAILER: hostMailer,
  PORTMAILER: portMailer,
}
