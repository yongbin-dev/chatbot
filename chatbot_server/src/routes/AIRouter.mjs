import { Router } from "express";
import { OpenAI } from "@langchain/openai";
import env from "dotenv";

env.config();

const model = new OpenAI({
  maxTokens: 25,
});

const AIRouter = Router();

AIRouter.post("/", async (req, res) => {
  const message = req.body.message;
  const response = await model.invoke(message);
  res.send(response);
});

export default AIRouter;
