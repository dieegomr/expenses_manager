export interface EmailSender {
  sendEmail: (options: EmailOptions) => Promise<void>;
}

type EmailOptions = {
  email: string;
  subject: string;
  text: string;
};
