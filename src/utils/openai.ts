import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
const OPEN_API_KEY = import.meta.env.VITE_OPEN_API_KEY

const openai = new OpenAI({
  apiKey: OPEN_API_KEY,
  dangerouslyAllowBrowser : true
});

const openAIUtils = {
  async main(message : ChatCompletionMessageParam[]) {
    const stream = await openai.chat.completions.create({
      model : "gpt-3.5-turbo",
      messages : message,
      temperature : 0.7,
     
    });
    return stream;
  }
}

export default openAIUtils;