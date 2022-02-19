import { IChatStore, IMessage } from '@types'
import { Request, Response } from 'express'

class ChatController {
  private store: IChatStore
  constructor(store: IChatStore) {
    this.store = store
  }

  addMessage = async (msg: IMessage) => {
    await this.store.addNewMessage(msg)
  }

  showChatView = async (req: Request, res: Response) => {
    res.status(200).render('chat')
  }

  getAllChats = async () => {
    const chats = await this.store.getAll()
    return chats
  }

  getUserChat = async (req: Request, res: Response) => {
    const { emailParam } = req.params
    const chats = await this.store.getUserChat(emailParam)

    let data = chats.map((doc) => {
      return {
        sennder: doc.sennder,
        sendAt: doc.sendAt,
        message: doc.message,
      }
    })

    res.status(200).render('chatPersonal', {
      data,
    })
  }
}

export default ChatController
