import winston, { Logger } from 'winston'
import Env from './env'

const myFormatConsole = winston.format.combine(
  winston.format.label({ label: '[Production]' }),
  winston.format.printf((info) => `${info.label} - El error surge en: --> ${info.message}`),
  winston.format.colorize({ all: true })
)
const myFormatFile = winston.format.combine(
  winston.format.label({ label: 'Error' }),
  winston.format.timestamp({ format: 'DD-MM-YYYY -- HH:mm:ss' }),
  winston.format.printf((error) => `${error.label} - {${error.timestamp}} | El error surge en: --> ${error.message}`)
)
const formatDev = winston.format.combine(
  winston.format.label({ label: '[Development]' }),
  winston.format.printf((info) => `${info.label} - El error surge en: --> ${info.message}`),
  winston.format.colorize({ all: true })
)

const LoggerProd = {
  msg: winston.createLogger({
    transports: [
      new winston.transports.Console({
        format: myFormatConsole,
      }),
      new winston.transports.File({
        format: myFormatFile,
        filename: './logs/error.log',
        level: 'error',
      }),
    ],
  }),
}

const LoggerDev = {
  msg: winston.createLogger({
    transports: [
      new winston.transports.Console({
        format: formatDev,
      }),
    ],
  }),
}

type ILogger = {
  msg: winston.Logger
}

let Logger: ILogger

switch (Env.NAME) {
  case 'development':
    Logger = LoggerDev
    break
  case 'production':
    Logger = LoggerProd
    break
  default:
    Logger = LoggerDev
    break
}

export { Logger }
