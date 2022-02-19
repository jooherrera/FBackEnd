import express, { Application } from 'express'
import { IEnvironment, IDataBase, IMessage, IMessageFromClient } from '@types'
import { exit } from 'process'
import emoji from 'node-emoji'
import router from '@routes/routes'
import { Logger } from '@config/logger'
import { engine } from 'express-handlebars'
import cors from 'cors'
import moment from 'moment'
import { Server as HttpServer } from 'http'
import { Server as IOServer } from 'socket.io'
import { chatController } from '@config/chatControllerWithDao'
import Env from './config/env'
import cookieParser from 'cookie-parser'

class ServerExpress {
  private server: Application
  private port: Number
  private environmentName: string
  private dataBase: IDataBase
  private dataBaseName: string
  private dirProductImages: string
  private dirAvatarImages: string
  private http: HttpServer
  private io: IOServer

  constructor(environment: IEnvironment) {
    this.server = express()
    this.port = environment.port
    this.environmentName = environment.environmentName
    this.dataBase = environment.dataBase
    this.dataBaseName = environment.dataBaseName
    this.dirProductImages = environment.dirProductImages
    this.dirAvatarImages = environment.dirAvatarImages

    this.http = new HttpServer(this.server)
    this.io = new IOServer(this.http)

    this.config()
    this.routes()
  }

  private config(): void {
    this.server.use(cors())
    this.server.use(express.json())
    this.server.use(express.urlencoded({ extended: true }))
    this.server.use(cookieParser())
    this.server.use('/resources/avatar', express.static(__dirname + '/public/avatar'))
    this.server.use('/resources/products', express.static(__dirname + '/public/products'))
    this.server.use('/resources/js', express.static(__dirname + '/public/js'))

    this.server.engine(
      'hbs',
      engine({
        extname: 'hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials',
      })
    )
    this.server.set('view engine', 'hbs')
    this.server.set('views', './src/views')

    this.io.on('connection', async (socket) => {
      socket.emit('connectionMessage', 'Conectado al centro de mensajes.')

      const chats = await chatController.getAllChats()
      socket.emit('historial', chats)

      socket.on('chatFront', async (info: IMessageFromClient) => {
        let sennder: string = 'User'
        if (info.user === Env.ADMIN_EMAIL) {
          sennder = 'System'
        }
        const msg = {
          user: info.user,
          sennder: sennder,
          message: info.message,
          sendAt: String(moment().locale('es-mx').format('LLL')),
        }

        await chatController.addMessage(msg)

        this.io.sockets.emit('chatBack', msg)
      })
    })
  }

  private routes(): void {
    this.server.use(router)
  }

  start(): void {
    this.http.listen(this.port, async () => {
      try {
        await this.dataBase.connect()
        console.log(emoji.get('fire'), `Server ON port: ${this.port} \nDatabase --> ${this.dataBaseName} `)
      } catch (error) {
        Logger.msg.error('error al iniciar el servidor')
        exit(1)
      }
    })
  }

  end(): void {
    exit()
  }

  getServer(): Application {
    return this.server
  }
}

export default ServerExpress
