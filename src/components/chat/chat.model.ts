import { IMessage } from '@types'
import { model, Schema } from 'mongoose'

const chatSchema = new Schema<IMessage>({
  user: { type: String, required: true },
  sennder: { type: String, required: true },
  message: { type: String, required: true },
  sendAt: { type: String, required: true },
})

export default model<IMessage>('Chat', chatSchema)
