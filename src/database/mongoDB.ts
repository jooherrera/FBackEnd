import { IDataBase } from '@types'
import mongoose from 'mongoose'

class MongoDb implements IDataBase {
  private URI: string

  constructor(uri?: string) {
    if (!uri) {
      throw new Error(`Falta la URI para conectar a mongo`)
    }
    this.URI = uri
  }

  connect(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        await mongoose.connect(this.URI)
        resolve(true)
      } catch (error) {
        reject(false)
      }
    })
  }
}

export default MongoDb
