import { Router } from 'express'
import { NetworkUser } from '@components/user/user.network'
import { NetworkAuth } from '@components/auth/auth.network'
import { NetworkProduct } from '@components/product/product.network'
import { Resp, SM } from '@config/handleResp'
import { NetworkCart } from '@components/cart/cart.network'
import { NetworkOrder } from '@components/order/order.network'
import { NetworkChat } from '@components/chat/chat.network'
import { authIsAdmin, authUser } from '@middlewares/auth'

const router = Router()

router.use('/', NetworkAuth)

router.use('/chat', NetworkChat)
// router.use('/api/v1/', NetworkAuth)
router.use('/api/v1/user', NetworkUser)
router.use('/api/v1/products', NetworkProduct)
router.use('/api/v1/cart', NetworkCart)
router.use('/api/v1/order', NetworkOrder)

// router.get('/api/v1/', (req, res) => {
//   Resp.error({
//     res,
//     err: SM.sendMessageError('urlNotFound'),
//   })
// })

export default router
