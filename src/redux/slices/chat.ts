import { createSlice } from "@reduxjs/toolkit";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

export interface ChatState {
  chats: [
    {
      id: number;
      title: string;
      chatMessage: [
        {
          message: ChatCompletionMessageParam;
          answer: string;
          date: string;
        }
      ];
      usage: {
        completion_tokens: number;
        prompt_tokens: number;
        total_tokens: number;
      };
      createDate: string;
    }
  ];
}

const initialState: ChatState = {
  chats: [
    {
      id: 0,
      title: "sample",
      chatMessage: [
        {
          message: {
            role: "user",
            content: "친구랑 대화하듯 답변해주세요.",
          },
          answer: "",
          date: "",
        },
      ],
      usage: {
        completion_tokens: 0,
        prompt_tokens: 0,
        total_tokens: 0,
      },
      createDate: "",
    },
  ],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    initChatMessage: (state, action) => {
      const chat = state.chats.filter((i: any) => i.id == action.payload.id)[0];
      chat.chatMessage = initialState.chats[0].chatMessage;
    },
    addChatMessage: (state, action) => {
      const chat = state.chats.filter((i: any) => i.id == action.payload.id)[0];
      if (!chat) return;

      const message = action.payload.message;
      const result = action.payload.result;
      const answer = result.choices[0].message.content;
      const usage = result.usage;

      const data = {
        message,
        answer,
        usage,
        token: 0,
        date: "",
      };

      chat.chatMessage.push(data);
    },
  },
});

// Action creators are generated for each case reducer function
export const { initChatMessage, addChatMessage } = chatSlice.actions;
export default chatSlice.reducer;
