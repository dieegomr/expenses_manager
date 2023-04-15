import {
  EmailOptions,
  EmailSender,
} from 'src/@core/domain/interfaces/email-sender.interface';
import nodemailer, { Transporter } from 'nodemailer';

const port = parseInt(process.env.EMAIL_PORT as string);

export class NodeMailerEmailSender implements EmailSender {
  sendEmail(options: EmailOptions) {
    const transporter: Transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: port,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const message = {
      to: options.email,
      subject: options.subject,
      text: options.text,
    };

    return transporter.sendMail(message);
  }
}
