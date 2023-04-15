export interface EmailSender {
  sendEmail: (options: EmailOptions) => Promise<void>;
}

export type EmailOptions = {
  email: string;
  subject: string;
  text: string;
};
