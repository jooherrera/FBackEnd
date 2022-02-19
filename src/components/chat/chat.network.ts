import { Router } from 'express'
import { chatController } from '@config/chatControllerWithDao'
import { cookieJwtAuth } from '@middlewares/auth'

const NetworkChat = Router()

NetworkChat.get('/', cookieJwtAuth, chatController.showChatView)

NetworkChat.get('/:emailParam', chatController.getUserChat)
export { NetworkChat }
