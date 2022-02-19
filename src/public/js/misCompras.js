const ordersDiv = document.getElementById('orders')

const getOrders = async () => {
  const user = document.querySelector('.user')
  const data = await fetch(`/api/v1/order/${user.id}`)
  const orders = await data.json()

  let html = ''
  orders.body.data.data.forEach((order) => {
    html += `
    <tr>
    <td style="text-align:center;">${order._id}</td>
    <td style="text-align:center;">${order.createdTime}</td>
    <td style="text-align:right;">$${order.totalPrice}</td>
    <td style="text-align:center;"><span class="btn  btn-xs ord_verdeclaro">${order.isDelivered}</span></td>
    <td style="text-align:center;"><i title="Pagado" class="fas fa-check-circle statusverde"></i>${order.isPaid}</td>
    <td style="text-align:center;">${order.shippingMethod}</td>
    
</tr>
      `
  })
  ordersDiv.innerHTML = html
}
getOrders()
