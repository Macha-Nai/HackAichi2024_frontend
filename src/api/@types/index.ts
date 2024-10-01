/* eslint-disable */
export type Book = {
  uuid: string;
  title: string;
}

export type Chatgpt = {
  text: string;
}

export type HTTPValidationError = {
  detail?: ValidationError[] | undefined;
}

export type IsAuthResponse = {
  access: boolean;
}

export type MailAllResponse = {
  mail_id: string;
  title: string;
  body: string;
  your_name: string;
  your_mail_address: string;
  rank: string;
  send_time: string;
  send_flag?: boolean | undefined;
}

export type MailDetail = {
  mail_id: string;
  title: string;
  body: string;
  your_name: string;
  your_mail_address: string;
  ai_answer?: string | undefined;
  rank: string;
  send_time: string;
}

export type MailSendRequest = {
  mail_id: string;
  your_mail_address: string;
  title: string;
  body: string;
}

export type User = {
  uuid: string;
  username: string;
}

export type UserDetail = {
  uuid: string;
  username: string;
  books?: Book[] | undefined;
}

export type ValidationError = {
  loc: string[];
  msg: string;
  type: string;
}
