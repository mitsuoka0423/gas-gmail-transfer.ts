import { Email } from "../../../domain/Email";
import { Thread } from "../../../domain/Thread";

export const query = (query: string): Thread[] => {
  const threads = GmailApp.search(query);
  const threadList = threads.map(convertGmailThread2Thread);
  return threadList;
};

const convertGmailThread2Thread = (gmailThread): Thread => {
  const messages = gmailThread.getMessages();
  const unreadEmails = messages.filter(message => message.isUnread()).map(convertGmailMessage2Email);
  return {
    id: gmailThread.getId(),
    unreadEmails,
    latestEmail: unreadEmails[unreadEmails.length - 1],
    url: gmailThread.getPermalink(),
  };
};

const convertGmailMessage2Email = (gmailMessage): Email => {
  return {
    id: gmailMessage.getId(),
    from: {
      address: gmailMessage.getFrom(),
      name: gmailMessage.getFrom(),
    },
    title: gmailMessage.getSubject(),
    body: gmailMessage.getPlainBody(),
    sentAt: new Date(gmailMessage.getDate().toISOString()),
  };
};

export const markRead = (thread: Thread) => {
  GmailApp.getThreadById(thread.id).markRead();
}