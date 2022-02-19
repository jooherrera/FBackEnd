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

export async function sendMail(mailOptions: any) {
  try {
    await transporter.sendMail(mailOptions)
  } catch (error) {
    throw new Error('Problemas al mandar email')
  }
}
