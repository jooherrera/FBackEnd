import { IAuthStore, ICartStore, IUserStore } from '@types'
import { Request, Response } from 'express'
import { SM, Resp } from '@config/handleResp'
import Env from '@config/env'
import Core from '@core/index'
import generateToken from '@helpers/generateToken'
import Helper from '@helpers/helper'
import { sendMail } from '@config/nodemailer'

class AuthController {
  private store: IAuthStore
  private cartStore: ICartStore
  private userStore: IUserStore
  constructor(store: IAuthStore, cartStore: ICartStore, userStore: IUserStore) {
    this.store = store
    this.cartStore = cartStore
    this.userStore = userStore
  }

  home = (req: Request, res: Response) => {
    let status: boolean = false
    if (Helper.equalsStrings(req.user.status, 'complete')) {
      status = true
    }

    res.render('home', {
      data: {
        email: req.user.email,
        status,
        avatar: req.userData.avatar,
      },
      isAdmin: req.user.isAdmin,
      id: req.user.user,
    })
  }

  loginView = (req: Request, res: Response) => {
    res.render('login')
  }

  registerView = (req: Request, res: Response) => {
    res.render('register')
  }

  register = async (req: Request, res: Response) => {
    try {
      const { email, password, confirmPassword } = req.body
      if (Helper.isSomeEmpty(email, password)) {
        throw SM.sendMessageError('sintaxError')
      }

      if (!Helper.equalsStrings(password, confirmPassword)) {
        throw SM.sendMessageError('passwordMissmatch')
      }

      if (await this.store.isEmailRegistered(email)) {
        throw SM.sendMessageError('alreadyExist')
      }

      const newAuth = Core.newAuth(email, password, Helper.isAdmin(email))
      const userAuth = await this.store.register(newAuth)

      const newUser = Core.newUser(userAuth._id)
      await this.userStore.registerUser(newUser)

      const newCart = Core.newCart(userAuth._id)
      await this.cartStore.createCart(newCart)

      const mailOptions = {
        from: 'CoderShop',
        to: Env.ADMIN_EMAIL,
        subject: 'Enviado desde nodemailer',
        html: `
            <h1>Nuevo Usuario registrado</h1>
            ${email}
          `,
      }

      sendMail(mailOptions)

      const userData = await this.store.findByEmail(email)

      const infoToSign = {
        user: userData._id,
        email: userData.email,
        status: userData.status,
        isAdmin: userData.isAdmin,
      }
      const token = generateToken.signToken(infoToSign, Env.SECRET_KEY, {
        expiresIn: Env.EXPIRE_TOKEN_TIME,
      })

      res.cookie('token', token, {
        httpOnly: true,
      })

      res.redirect('/')
    } catch (error: any) {
      Helper.logError(error, '/register')
      res.render('error', {
        code: error.code || 500,
        message: error.clientMsg || 'Error desconocido. Pronto lo solucionaremos',
      })
    }
  }

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body

      if (Helper.isSomeEmpty(email, password)) {
        throw SM.sendMessageError('sintaxError')
      }

      const userData = await this.store.findByEmail(email)

      if (!Helper.isIdentical(password, userData.password)) {
        throw SM.sendMessageError('unauthorized')
      }

      const infoToSign = {
        user: userData._id,
        email: userData.email,
        status: userData.status,
        isAdmin: userData.isAdmin,
      }

      const token = generateToken.signToken(infoToSign, Env.SECRET_KEY, {
        expiresIn: Env.EXPIRE_TOKEN_TIME,
      })

      res.cookie('token', token, {
        httpOnly: true,
      })

      res.redirect('/')
    } catch (error: any) {
      Helper.logError(error, '/login')
      res.render('error', {
        code: error.code || 500,
        message: error.clientMsg || 'Error desconocido. Pronto lo solucionaremos',
      })
    }
  }
}

export default AuthController
