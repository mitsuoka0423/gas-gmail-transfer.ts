export const notify = async ({ token, message }) => {
  await UrlFetchApp.fetch("https://notify-api.line.me/api/notify", {
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    payload: {
      message,
    },
  });
};
