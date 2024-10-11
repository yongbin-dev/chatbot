import { OPEN_API, CLAUDE_API_KEY } from "@/config";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";
import { ModelType } from "@/constants/modelConstants";
import { MessageParam } from "@anthropic-ai/sdk/resources/messages.mjs";

// chat GPT
const openai = new OpenAI({
  apiKey: OPEN_API,
  dangerouslyAllowBrowser: true,
});

const anthropic = new Anthropic({
  apiKey: CLAUDE_API_KEY, // defaults to process.env["ANTHROPIC_API_KEY"]
  dangerouslyAllowBrowser: true,
});

const openAIUtils = {
  async sendQuestion(
    originalMessage: ChatCompletionMessageParam[] | MessageParam[],
    modelType: string,
    model: string,
    isSlice = true
  ) {
    let message = originalMessage;
    if (isSlice == true) {
      message = sliceMessage(message);
    }

    switch (modelType) {
      case ModelType.GPT:
        try {
          const stream = await openai.chat.completions.create({
            model,
            messages: message as ChatCompletionMessageParam[],
            temperature: 0.7,
            stream: true,
          });
          return stream;
        } catch (error) {
          throw error;
        }
      case ModelType.CLAUDE:
        message = message.slice(1);
        const msg = await anthropic.messages.stream({
          model,
          max_tokens: 1024,
          messages: message as MessageParam[],
        });
        return msg;

      default:
        return null;
    }
  },
  async sendQuestionImageGeneration(prompt: string) {
    const stream = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      size: "1024x1024",
      quality: "standard",
      n: 1,
    });

    return stream;
  },

  getSystemMessage() {
    return `저는 java 언어를 기반으로 하는 백엔드 개발자입니다.`;
  },
};

const sliceMessage = (
  originalMessage: ChatCompletionMessageParam[] | MessageParam[]
) => {
  if (originalMessage.length < 5) return originalMessage;

  return originalMessage.slice(2);
};

export default openAIUtils;
