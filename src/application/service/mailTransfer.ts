import { query, markRead } from "../adaptor/persistence-adaptor/gmail";
import { notify as discordNotify } from "../adaptor/persistence-adaptor/discord";
import { notify as lineNotify } from "../adaptor/persistence-adaptor/line";

interface MailTransferProps {
  gmailQuery: {
    from: string;
  };
  discord: {
    webhookUrl: string;
  };
  line: {
    notify: {
      token?: string;
    };
  };
}

export const execute = async ({
  gmailQuery,
  discord,
  line,
}: MailTransferProps) => {
  const threadList = query(`from: ${gmailQuery.from} is:unread`);
  console.log(JSON.stringify(threadList));

  if (threadList.length === 0) {
    console.log("新着メッセージなし");
    return;
  }

  const message = threadList
    .map((thread) => {
      return `
\`\`\`
差出人　：${thread.latestEmail.from.name}
タイトル：${thread.latestEmail.title}
送信日時：${thread.latestEmail.sentAt.toISOString()}
\`\`\`
${thread.latestEmail.body.slice(0, 200)}

> ${thread.url}
`.trim();
    })
    .join("\n");

  try {
    await discordNotify({
      webhookUrl: discord.webhookUrl,
      content: message,
    });

    if (line.notify.token) {
      await lineNotify({
        token: line.notify.token,
        message,
      });
    }

    threadList.forEach((thread) => {
      markRead(thread);
    });
  } catch (e) {
    await discordNotify({
      webhookUrl: discord.webhookUrl,
      content: `処理中にエラーが発生しました。\n${e}`,
    });
    console.log(e);
  }
};
