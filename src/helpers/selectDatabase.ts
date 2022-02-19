import FileStorage from '@database/fileStorage'
import MongoDb from '@database/mongoDB'
import { exit } from 'process'

export const selectDatabase = (optionFromEnv: string) => {
  try {
    switch (optionFromEnv) {
      case 'mongo':
        return new MongoDb(process.env.MONGO_URI)
      case 'file':
        return new FileStorage()
      default:
        throw `No existe base de datos que coincida con --> ${optionFromEnv}`
    }
  } catch (error) {
    exit()
  }
}
