const { Configuration, OpenAIApi } = require("openai");

import { getPrompt } from "./prompt";

export const postChatCompletion = async (
	content: string,
	apiKey: string,
	model = "gpt-3.5-turbo",
): Promise<string> => {
	const configuration = new Configuration({ apiKey });
	const openai = new OpenAIApi(configuration);

	const completion = await openai.createChatCompletion({
		model,
		messages: [{ role: "user", content }],
	});

	return completion.data.choices[0].message.content.trim();
};

export { getPrompt };
