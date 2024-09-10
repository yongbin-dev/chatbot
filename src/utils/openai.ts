import { OPEN_API , CLAUDE_API_KEY } from "@/config";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import Anthropic from '@anthropic-ai/sdk';
import OpenAI from "openai";
import { ModelType } from "@/constants/modelConstants";

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
    originalMessage: ChatCompletionMessageParam[],
    modelType : string , 
    model: string,
    isSlice = true
  ) {

    let message = originalMessage;
    if (isSlice == true) {
      message = sliceMessage(message);
    }

    switch (modelType) {
      case ModelType.GPT: 
        const stream = await openai.chat.completions.create({
          model,
          messages: message,
          temperature: 0.7,
          stream: true,
        });

        return stream;
      case ModelType.CLAUDE: 
        const msg = await anthropic.messages.create({
          model: "claude-3-5-sonnet-20240620",
          max_tokens: 1024,
          messages: [{ role: "user", content: "Hello, Claude" }],
        });

        return msg;
    } 

    return null;
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
};

const sliceMessage = (originalMessage: ChatCompletionMessageParam[]) => {
  if (originalMessage.length < 5) return originalMessage;

  return originalMessage.slice(2);
};

export default openAIUtils;
