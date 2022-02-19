import { Request, Response } from 'express'

class ViewsController {
  addProduct = (req: Request, res: Response) => {
    res.render('adminViews/addProduct', {
      data: {
        email: req.user.email,
        status: req.user.status === 'complete' ? true : false,
        avatar: req.userData.avatar,
      },
      isAdmin: req.user.isAdmin,
    })
  }

  getAll = (req: Request, res: Response) => {
    res.render('adminViews/getAll', {
      data: {
        email: req.user.email,
        status: req.user.status === 'complete' ? true : false,
        avatar: req.userData.avatar,
      },
      isAdmin: req.user.isAdmin,
    })
  }

  updateProduct = (req: Request, res: Response) => {
    const { id } = req.params

    res.render('adminViews/update', {
      data: {
        email: req.user.email,
        status: req.user.status === 'complete' ? true : false,
        avatar: req.userData.avatar,
      },
      isAdmin: req.user.isAdmin,
      id,
    })
  }

  updateUser = (req: Request, res: Response) => {
    const { id } = req.params

    res.render('updateUserInfo', {
      data: {
        email: req.user.email,
        status: req.user.status === 'complete' ? true : false,
        avatar: req.userData.avatar,
      },
      isAdmin: req.user.isAdmin,
      id,
    })
  }

  carrito = (req: Request, res: Response) => {
    res.render('carrito', {
      data: {
        email: req.user.email,
        status: req.user.status === 'complete' ? true : false,
        avatar: req.userData.avatar,
      },
      isAdmin: req.user.isAdmin,
      id: req.user.user,
    })
  }

  order = (req: Request, res: Response) => {
    res.render('order', {
      data: {
        email: req.user.email,
        status: req.user.status === 'complete' ? true : false,
        avatar: req.userData.avatar,
      },
      isAdmin: req.user.isAdmin,
      id: req.user.user,
    })
  }

  getOrders = (req: Request, res: Response) => {
    res.render('allOrders', {
      data: {
        email: req.user.email,
        status: req.user.status === 'complete' ? true : false,
        avatar: req.userData.avatar,
      },
      isAdmin: req.user.isAdmin,
      id: req.user.user,
    })
  }
}

export default new ViewsController()
