import {
  EmailOptions,
  EmailSender,
} from 'src/@core/domain/interfaces/email-sender.interface';

export class FakeEmailSender implements EmailSender {
  async sendEmail(options: EmailOptions) {
    console.log(options);
  }
}
