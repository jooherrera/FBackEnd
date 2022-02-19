import { IChatStore, IMessage } from '@types'
import chatModel from '../chat.model'

class ChatStoreMongo implements IChatStore {
  async addNewMessage(msg: IMessage): Promise<void> {
    await new chatModel(msg).save()
  }

  async getUserChat(email: string): Promise<IMessage[] | []> {
    try {
      const chat = await chatModel.find({ user: email })

      if (!chat) {
        throw new Error()
      }
      return chat
    } catch (error) {
      return []
    }
  }

  async getAll(): Promise<IMessage[]> {
    try {
      const chats = await chatModel.find({})
      if (chats) {
        return chats
      }
      throw new Error('No hay chats')
    } catch (error) {
      return []
    }
  }
}

export default new ChatStoreMongo()
