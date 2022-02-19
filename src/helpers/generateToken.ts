import { SM } from '@config/handleResp'
import jwt, { JwtPayload } from 'jsonwebtoken'

const signToken = (info: any, secretKey: string, options: any) => {
  return jwt.sign(info, secretKey, options)
}

const verifyToken = (token: string, secretKey: string): JwtPayload => {
  try {
    const jwtData = jwt.verify(token, secretKey)
    if (typeof jwtData === 'object') {
      return jwtData
    } else {
      throw SM.sendMessageError('unauthorized')
    }
  } catch (error) {
    throw SM.sendMessageError('unauthorized')
  }
}

const hasAuthHeader = (req: any): boolean => {
  return typeof req.headers['authorization'] !== 'undefined'
}

const splitHeader = (req: any): string => {
  const header: string = req.headers['authorization']
  return header.split(' ')[1]
}

export = {
  signToken,
  verifyToken,
  hasAuthHeader,
  splitHeader,
}
