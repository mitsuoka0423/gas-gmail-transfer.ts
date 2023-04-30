import { Email } from './Email';

export interface Thread {
  id: string;
  unreadEmails: Email[];
  latestEmail: Email;
  url: string;
}