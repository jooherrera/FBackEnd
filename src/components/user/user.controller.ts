import { IAuthStore, IUserStore } from '@types'
import { Request, Response } from 'express'
import { SM, Resp } from '@config/handleResp'
import Env from '@config/env'
import { logError } from '@helpers/helper'
import { noInfoForUpdate } from '@helpers/noInfoForUpdate'
import UserDto from './dto/user.dto'
import generateToken from '@helpers/generateToken'

class UserController {
  private store: IUserStore
  private authStore: IAuthStore
  constructor(store: IUserStore, authStore: IAuthStore) {
    this.store = store
    this.authStore = authStore
  }

  show = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      console.log(id)
      // const emptyUser = Core.newUser()
      const userData = await this.store.findUser(id)

      // const info = {
      //   info: userData.info,
      //   avatar: userData.avatar,
      // }

      Resp.success({
        res,
        clientMsg: SM.sendMessageOk('success'),
        data: new UserDto(userData),
      })
    } catch (error: any) {
      logError(error, '[User - Show]')

      Resp.error({
        res,
        err: error,
      })
    }
  }

  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const imgName = req.file?.filename
      const fieldsForUpdate = req.body
      let token: string

      Object.keys(fieldsForUpdate).forEach((key) => {
        if (fieldsForUpdate[key] === '') {
          delete fieldsForUpdate[key]
        }
      })

      if (noInfoForUpdate(fieldsForUpdate, imgName)) {
        Resp.success({
          res,
          clientMsg: SM.sendMessageOk('noFieldsForUpdate'),
          data: '',
        })
        return
      }

      const avatarUrl = imgName ? `${Env.DIR_AVATAR}${imgName}` : ''

      const isComplete = await this.store.updateUser(id, { ...fieldsForUpdate }, avatarUrl)

      if (isComplete) {
        await this.authStore.updateStatus(id, 'complete')

        const userInfo = await this.authStore.findUserById(id)

        const newInfoToSign = {
          user: userInfo._id,
          email: userInfo.email,
          status: userInfo.status,
          isAdmin: userInfo.isAdmin,
        }

        token = generateToken.signToken(newInfoToSign, Env.SECRET_KEY, {
          expiresIn: Env.EXPIRE_TOKEN_TIME,
        })
      } else {
        await this.authStore.updateStatus(id, 'incomplete')
        token = ''
      }

      res.cookie('token', token, {
        httpOnly: true,
      })

      Resp.success({
        res,
        clientMsg: SM.sendMessageOk('updateOk'),
        data: '',
      })
    } catch (error: any) {
      logError(error, '[User - Update]')
      Resp.error({
        res,
        err: error,
      })
    }
  }

  getUser = async (id: string) => {
    return await this.store.findUser(id)
  }
}

export default UserController
