import { ICart } from '@types'
import { model, Schema } from 'mongoose'

const CartSchema = new Schema<ICart>(
  {
    authId: { type: String, required: true },
    products: { type: [], required: true },
  },
  { timestamps: true }
)

export default model<ICart>('Cart', CartSchema)
