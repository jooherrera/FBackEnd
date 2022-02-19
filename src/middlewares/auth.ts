import { NextFunction, Request, Response } from 'express'
import generateToken from '@helpers/generateToken'
import Env from '@config/env'
import Helper from '@helpers/helper'
import HelperController from '@helpers/helperController'

const cookieJwtAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.cookies
    const infoFromToken = generateToken.verifyToken(token, Env.SECRET_KEY)
    const userInfo = await HelperController.getUser(infoFromToken.user)
    req.user = infoFromToken
    req.userData = userInfo
    next()
  } catch (error) {
    Helper.logError(error, 'Middleware - cookiJwtAuth')
    res.clearCookie('token')
    return res.redirect('/login')
  }
}

const cookieJwtAuthAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.cookies
    const infoFromToken = generateToken.verifyToken(token, Env.SECRET_KEY)
    const userInfo = await HelperController.getUser(infoFromToken.user)
    req.user = infoFromToken
    req.userData = userInfo
    if (infoFromToken.isAdmin) {
      return next()
    }
    throw new Error('No es Admin')
  } catch (error: any) {
    Helper.logError(error, 'Middleware - cookiJwtAuth')
    res.clearCookie('token')
    return res.redirect('/login')
  }
}

const cookieJwtClear = async (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie('token')
  return res.redirect('/login')
}

export { cookieJwtAuth, cookieJwtAuthAdmin, cookieJwtClear }
