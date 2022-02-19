import { IDataBase } from '@types'

class FileStorage implements IDataBase {
  constructor() {}
  connect(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      resolve(true)
    })
  }
}

export default FileStorage
