import { execute } from "../../../service/mailTransfer";

interface GasAdaptorProps {
  DISCORD_WEBHOOK_URL: string;
  GMAIL_QUERY_FROM: string;
  LINE_NOTIFY_TOKEN?: string;
}

export const adaptor = async (props: GasAdaptorProps) => {
  const result = await execute({
    gmailQuery: { from: props.GMAIL_QUERY_FROM },
    discord: {
      webhookUrl: props.DISCORD_WEBHOOK_URL,
    },
    line: {
      notify: {
        token: props.LINE_NOTIFY_TOKEN,
      },
    },
  });
  return result;
};
