export const notify = async ({
  webhookUrl,
  content,
}: {
  webhookUrl: string;
  content: string;
}) => {
  await UrlFetchApp.fetch(webhookUrl, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    payload: JSON.stringify({
      content,
    }),
  });
};
