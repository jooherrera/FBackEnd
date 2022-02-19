import { IOrder } from '@types'
import { model, Schema } from 'mongoose'
const OrderSchema = new Schema<IOrder>(
  {
    user: { type: String, required: true },
    orderItems: { type: [], required: true },
    shippingAddress: {
      address: { type: String, required: true },
    },
    payMethod: { type: String, required: true },
    taxPrice: { type: Number, required: true },
    shippingMethod: { type: String, required: true },
    shippingPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, required: true },
    paidAt: { type: String, required: true },
    isDelivered: { type: Boolean, required: true },
    deliveredAt: { type: String, required: true },
    createdTime: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

export default model<IOrder>('Order', OrderSchema)
