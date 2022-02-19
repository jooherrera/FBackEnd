import { IOrder } from '@types'

class OrderDto {
  private data: IOrder[]
  constructor(data: IOrder[]) {
    this.data = data.map((el) => {
      return {
        _id: el._id,
        user: el.user,
        orderItems: el.orderItems,
        shippingAddress: el.shippingAddress,
        payMethod: el.payMethod,
        taxPrice: el.taxPrice,
        shippingMethod: el.shippingMethod,
        shippingPrice: el.shippingPrice,
        totalPrice: el.totalPrice,
        isPaid: el.isPaid,
        paidAt: el.paidAt,
        isDelivered: el.isDelivered,
        deliveredAt: el.deliveredAt,
        createdTime: el.createdTime,
      }
    })
  }
}

export default OrderDto
