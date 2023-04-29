import { query, markRead } from "../adaptor/persistence-adaptor/gmail";
import { notify } from "../adaptor/persistence-adaptor/discord";

interface MailTransferProps {
	gmailQuery: {
		from: string;
	};
	discord: {
		webhookUrl: string;
	};
}

export const execute = async ({
	gmailQuery,
	discord,
}: MailTransferProps) => {
	const threadList = query(`from: ${gmailQuery.from} is:unread`);
	console.log(threadList);

	if (threadList.length === 0) {
		console.log('新着メッセージなし');
		return;
	}

	const message = threadList.map((thread) => {
		return `
差出人　：${thread.emails[0].from.name}
ＵＲＬ　：${thread.url}
タイトル：${thread.emails[0].title}
本文　　：${thread.emails[0].body.slice(0, 200)}
`.trim();
	}).join('\n');

	try {
		await notify({
			webhookUrl: discord.webhookUrl,
			content: message,
		});
	
		threadList.forEach((thread) => {
			markRead(thread);
		});
	} catch (e) {
		await notify({
			webhookUrl: discord.webhookUrl,
			content: `処理中にエラーが発生しました。\n${e}`,
		});
		console.log(e);
	}
};
