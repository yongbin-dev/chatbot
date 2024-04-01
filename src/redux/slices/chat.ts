import { createSlice } from "@reduxjs/toolkit";

export interface ChatState {
  chats: [
    {
      id: number;
      title: string;
      chatMessage: any;
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
    addChat: (state, action) => {
      const title = action.payload.title;
      const idArr = state.chats.map((i: any) => i.id);
      const maxID = Math.max(...idArr);

      let id = maxID + 1;

      const chat = {
        id,
        title: title,
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
      };

      state.chats.push(chat);
    },

    deleteChat: (state, action) => {
      const id = action.payload.id;

      state.chats.map((i: any, index: number) => {
        if (i.id == id) {
          state.chats.splice(index, 1);
          return;
        }
      });
    },
    initChatMessage: (state, action) => {
      const chat = state.chats.filter((i: any) => i.id == action.payload.id)[0];
      chat.chatMessage = initialState.chats[0].chatMessage;
    },
    addChatMessage: (state, action) => {
      const chat = state.chats.filter((i: any) => i.id == action.payload.id)[0];
      if (!chat) return;

      const message = action.payload.message;
      const answer = action.payload.result;
      const usage = action.payload.usage;

      const data = {
        message,
        answer,
        usage,
        token: 0,
        date: "",
      };

      chat.chatMessage.push(data);
    },
    deleteChatMessage: (state, action) => {
      const chatId = action.payload.chatId;
      const messageIndex = action.payload.messageIndex;

      const chat = state.chats.filter((i: any) => i.id == chatId)[0];

      chat.chatMessage.splice(messageIndex, 1);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addChat,
  deleteChat,
  initChatMessage,
  addChatMessage,
  deleteChatMessage,
} = chatSlice.actions;
export default chatSlice.reducer;
