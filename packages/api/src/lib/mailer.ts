import nodemailer, { Transporter } from "nodemailer"

import { DEV_EMAIL_OPTIONS, IS_PRODUCTION, IS_STAGING } from "./config"

const devMail: Transporter = nodemailer.createTransport(DEV_EMAIL_OPTIONS)

interface MailArgs {
  to: string | string[]
  variables?: any
}

export class Mailer {
  private readonly from: string = "Example <noreply@example.com>"
  send(args: MailArgs) {
    const data = {
      from: this.from,
      to: args.to,
    }
    return this.sendDev(args)
  }

  async sendDev(args: MailArgs) {
    return devMail.sendMail({
      to: args.to,
      from: this.from,
    })
  }
}
