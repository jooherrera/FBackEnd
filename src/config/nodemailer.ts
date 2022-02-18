import { createTransport } from 'nodemailer'
import Env from '@config/env'

/* ---------------------------------- GMAIL --------------------------------- */

const transporter = createTransport({
  host: Env.HOSTMAILER,
  port: Env.PORTMAILER,
  secure: true,
  auth: {
    user: Env.USERMAILER,
    pass: Env.PASSMAILER,
  },
})

//Enviar Mail

export async function sendMail(mailOptions: any) {
  try {
    const response = await transporter.sendMail(mailOptions)
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}
