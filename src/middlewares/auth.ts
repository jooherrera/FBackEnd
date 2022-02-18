import { NextFunction, Request, Response } from 'express'
import generateToken from '@helpers/generateToken'
import { Resp, SM } from '@config/handleResp'
import Env from '@config/env'
import { logError } from '@helpers/helper'
import { blockListController } from '@config/blockListControllerWithDao'
// import Helper from '@helpers/index'
import Helper from '@helpers/helper'
import HelperController from '@helpers/helperController'

const cookieJwtAuth = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies
  try {
    const infoFromToken = generateToken.verifyToken(token, Env.SECRET_KEY)
    const userInfo = await HelperController.getUser(infoFromToken.user)
    req.user = infoFromToken
    req.userData = userInfo
    next()
  } catch (error: any) {
    logError(error, 'Middleware - cookiJwtAuth')
    res.clearCookie('token')
    return res.redirect('/login')
  }
}

const authUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!generateToken.hasAuthHeader(req)) {
      throw SM.sendMessageError('unauthorized')
    }
    const token = generateToken.splitHeader(req)

    if (await blockListController.isInBlockList(token)) {
      throw SM.sendMessageError('invalidToken')
    }

    const infoFromToken = generateToken.verifyToken(token, Env.SECRET_KEY)

    req.user = infoFromToken

    next()
  } catch (error: any) {
    logError(error, 'Middleware - AuthUser')

    Resp.error({
      res,
      err: error,
    })
  }
}

const authIsAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { isAdmin } = req.user
    if (isAdmin) {
      return next()
    }
    throw SM.sendMessageError('unauthorized')
  } catch (error: any) {
    logError(error, 'Middleware - authIsAdmin')
    Resp.error({
      res,
      err: error,
    })
  }
}

const addTokenToBlockList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!generateToken.hasAuthHeader(req)) {
      throw SM.sendMessageError('unauthorized')
    }
    const token = generateToken.splitHeader(req)

    await blockListController.addToBlockList(token)

    next()
  } catch (error: any) {
    logError(error, 'Middleware - addTokenToBlockList')
    Resp.error({
      res,
      err: error,
    })
  }
}

const checkUserID = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const { user } = req.user
    if (Helper.equalsStrings(id, String(user))) {
      return next()
    }

    throw SM.sendMessageError('unauthorized')
  } catch (error: any) {
    logError(error, 'Middleware - checkUser')
    Resp.error({
      res,
      err: error,
    })
  }
}

const checkStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status } = req.user
    if (Helper.equalsStrings(status, 'incomplete')) {
      throw SM.sendMessageError('incompleteInfo')
    }
    next()
  } catch (error: any) {
    logError(error, 'Middleware - checkUser')
    Resp.error({
      res,
      err: error,
    })
  }
}

const checkUserEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { emailParam } = req.params
    const { email } = req.user

    if (!Helper.equalsStrings(emailParam, email)) {
      throw SM.sendMessageError('invalidEmail')
    }

    next()
  } catch (error: any) {
    logError(error, 'Middleware - checkUser')
    Resp.error({
      res,
      err: error,
    })
  }
}

export { authUser, addTokenToBlockList, authIsAdmin, checkUserID, checkStatus, checkUserEmail, cookieJwtAuth }
