export interface Email {
  id: string;
  from: {
    address: string;
    name: string;
  };
  title: string;
  body: string;
  sentAt: Date;
}
