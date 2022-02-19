import { Info, IUserWithID } from '@types'

class UserDto {
  private info: Info
  private avatar: string
  constructor(data: IUserWithID) {
    this.info = data.info
    this.avatar = data.avatar
  }
}

export default UserDto
