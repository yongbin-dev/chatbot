import { CLAUDE_API_KEY, OPEN_API } from "@/config";
import { ModelType } from "@/constants/modelConstants";
import Anthropic from "@anthropic-ai/sdk";
import { MessageParam } from "@anthropic-ai/sdk/resources/messages.mjs";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

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
    isSlice = true,
    isSystem = true
  ) {
    let message: any = originalMessage;
    if (isSlice == true) {
      message = sliceMessage(message);
    }

    switch (modelType) {
      case ModelType.GPT:
        const option: any = {
          model,
          stream: true,
          temperature: 0.7,
        };

        if (isSystem == false) {
          message = originalMessage.filter((i) => i.role == "user");
          delete option.temperature;
        }

        try {
          const stream = await openai.chat.completions.create({
            messages: message as ChatCompletionMessageParam[],
            ...option,
          });
          return stream;
        } catch (error) {
          throw error;
        }
      case ModelType.CLAUDE:
        try {
          message = originalMessage.filter((i) => i.role == "user");
          const msg = await anthropic.messages.stream({
            model,
            max_tokens: 1024,
            messages: message as MessageParam[],
          });
          return msg;
        } catch (error) {
          throw error;
        }

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
