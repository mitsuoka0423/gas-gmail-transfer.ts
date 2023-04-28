import { Email } from './Email';

export interface Thread {
  id: string;
  emails: Email[];
  url: string;
}