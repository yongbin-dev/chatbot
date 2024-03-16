import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { OPEN_API } from "@/config";

const openai = new OpenAI({
  apiKey: OPEN_API,
  dangerouslyAllowBrowser: true,
});

const openAIUtils = {
  async sendQuestion(
    originalMessage: ChatCompletionMessageParam[],
    isSlice = true
  ) {
    let message = originalMessage;

    if (isSlice == true) {
      message = sliceMessage(message);
    }

    const stream = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: message,
      temperature: 0.7,
    });
    return stream;
  },
};

const sliceMessage = (originalMessage: ChatCompletionMessageParam[]) => {
  if (originalMessage.length < 5) return originalMessage;

  return originalMessage.slice(2);
};

export default openAIUtils;
