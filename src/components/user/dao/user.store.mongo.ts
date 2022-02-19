import { SM } from '@config/handleResp'
import { dataForUpdate, IEmptyUser, Info, IUserStore, IUserWithID } from '@types'
import userModel from '../user.model'
import Helper from '@helpers/helper'

class UserStoreMongo implements IUserStore {
  async findUser(authId: string): Promise<IUserWithID> {
    try {
      const user = await userModel.findOne({ authId })

      if (!user) {
        throw SM.sendMessageError('userNotFound')
      }

      return user
    } catch (error: any) {
      throw SM.sendMessageError('', error, '[Store - findUserById]')
    }
  }

  async registerUser(emptyUser: IEmptyUser): Promise<IUserWithID> {
    try {
      return await new userModel({ ...emptyUser }).save()
    } catch (error: any) {
      throw SM.sendMessageError('', error, '[Store - registerUser]')
    }
  }

  async updateUser(authId: string, data: dataForUpdate, avatarUrl: string): Promise<boolean> {
    try {
      const infoUpdate = Helper.getUpdateFields(data, avatarUrl)

      await userModel.findOneAndUpdate({ authId }, infoUpdate)
      const user = await userModel.findOne({ authId })

      if (user) {
        const info: Info = user.info
        if (Helper.isUserInfoComplete(info)) {
          return true
        } else {
          return false
        }
      }
      return false
    } catch (error: any) {
      throw SM.sendMessageError('', error, '[Store - updateUser]')
    }
  }
}

export default new UserStoreMongo()
