import { IAuthStore, ICartStore, IUserStore, IUserWithID } from '@types'
import { isIdentical, isSomeEmpty, logError } from '@helpers/helper'
import { Request, Response } from 'express'
import { SM, Resp } from '@config/handleResp'
import Env from '@config/env'
import Core from '@core/index'
import generateToken from '@helpers/generateToken'
import AuthDto from './dto/auth.dto'
import { isAdmin } from '@helpers/isAdmin'
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

  register = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body
      if (isSomeEmpty(email, password)) {
        throw SM.sendMessageError('sintaxError')
      }

      if (await this.store.isEmailRegistered(email)) {
        throw SM.sendMessageError('alreadyExist')
      }

      const newAuth = Core.newAuth(email, password, isAdmin(email))
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

      Resp.success({
        res,
        clientMsg: SM.sendMessageOk('authRegistered'),
        data: '',
      })
    } catch (error: any) {
      logError(error, '/register')
      Resp.error({
        res,
        err: error,
      })
    }
  }

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body

      if (isSomeEmpty(email, password)) {
        throw SM.sendMessageError('sintaxError')
      }

      const userData = await this.store.findByEmail(email)

      if (!isIdentical(password, userData.password)) {
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

      Resp.success({
        res,
        clientMsg: SM.sendMessageOk('userLogin'),
        data: new AuthDto({ token, id: userData._id }),
      })
    } catch (error: any) {
      logError(error, '/login')
      Resp.error({
        res,
        err: error,
      })
    }
  }

  logOut = (req: Request, res: Response) => {
    Resp.success({
      res,
      clientMsg: SM.sendMessageOk('logout'),
      data: '',
    })
  }
}

export default AuthController
