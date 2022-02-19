import { dataForUpdate, IEmptyUser, IUserStore, IUserWithID } from '@types'

class UserStoreFile implements IUserStore {
  findUser(authID: string): Promise<IUserWithID> {
    return new Promise((resolve, reject) => {
      reject(`Metodo no implementado`)
    })
  }

  registerUser(emptyUser: IEmptyUser): Promise<IUserWithID> {
    return new Promise((resolve, reject) => {
      reject(`Metodo no implementado`)
    })
  }

  updateUser(authId: string, data: dataForUpdate, avatarUrl: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      reject(`Metodo no implementado`)
    })
  }
}

export default new UserStoreFile()
