import { adaptor } from "../../application/adaptor/client-adaptor/gas-adaptor";

const GMAIL_QUERY_FROM =
  PropertiesService.getScriptProperties().getProperty("GMAIL_QUERY_FROM");
if (!GMAIL_QUERY_FROM) {
  throw new Error("メールの検索条件が未設定です");
}

const DISCORD_WEBHOOK_URL =
  PropertiesService.getScriptProperties().getProperty("DISCORD_WEBHOOK_URL");
if (!DISCORD_WEBHOOK_URL) {
  throw new Error("DiscordのWebhook URLが未設定です");
}

const main = async () => {
  await adaptor({
    GMAIL_QUERY_FROM,
    DISCORD_WEBHOOK_URL,
  });

  console.log("finished");
};
