import { Resp, SM } from '@config/handleResp'
import Helper from '@helpers/helper'
import { uploadFile } from '@helpers/multerUserAvatar'
import { uploadProductImage } from '@helpers/multerProductImage'
import { Request, Response, NextFunction } from 'express'

const uploadAvatar = (req: Request, res: Response, next: NextFunction) => {
  uploadFile(req, res, function (err) {
    if (err) {
      Helper.logError(err, 'Middleware - uploading file')
      Resp.error({
        res,
        err: SM.sendMessageError('imageError'),
      })
    } else {
      next()
    }
  })
}

const uploadImageForProduct = (req: Request, res: Response, next: NextFunction) => {
  uploadProductImage(req, res, function (err) {
    if (err) {
      Helper.logError(err, 'Middleware - uploading file')
      Resp.error({
        res,
        err: SM.sendMessageError('imageError'),
      })
    } else {
      next()
    }
  })
}

export { uploadAvatar, uploadImageForProduct }
