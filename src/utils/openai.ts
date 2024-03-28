import { OPEN_API } from "@/config";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

const openai = new OpenAI({
  apiKey: OPEN_API,
  dangerouslyAllowBrowser: true,
});

const openAIUtils = {
  async sendQuestion(
    originalMessage: ChatCompletionMessageParam[],
    model: string,
    isSlice = true
  ) {
    let message = originalMessage;

    if (isSlice == true) {
      message = sliceMessage(message);
    }

    const stream = await openai.chat.completions.create({
      model,
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
