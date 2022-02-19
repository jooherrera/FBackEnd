import userStoreMongo from '@components/user/dao/user.store.mongo'
import userStoreFile from '@components/user/dao/user.store.file'

import authStoreMongo from '@components/auth/dao/auth.store.mongo'
import authStoreFile from '@components/auth/dao/auth.store.file'

import UserController from '@components/user/user.controller'
import Env from '@config/env'

let userController: UserController

switch (Env.DATABASENAME) {
  case 'mongo':
    userController = new UserController(userStoreMongo, authStoreMongo)
    break
  case 'file':
    userController = new UserController(userStoreFile, authStoreFile)
    break

  default:
    userController = new UserController(userStoreFile, authStoreFile)
    break
}

export { userController }
