import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

export interface ChatState {
  chats: [
    {
      id: number;
      title: string;
      message: any;
      usage: {
        completion_tokens: number;
        prompt_tokens: number;
        total_tokens: number;
      };
      isPic : boolean;
      pic_message? : any;
      createDate: string;
      modifyDate: string;
    }
  ];
}

// isPic: false,
// picUrl: "",
// date: "", 

const initialState: ChatState = {
  chats: [
    {
      id: 0,
      title: "sample",
      message: [{
        role: "system",
        content: "",
      }],
      usage: {
        completion_tokens: 0,
        prompt_tokens: 0,
        total_tokens: 0,
      },
      isPic : false,
      pic_message : [] ,
      createDate: "",
      modifyDate : "",
    },
  ],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addChat: (state, action) => {
      const title : string  = action.payload.title;
      const isPic : boolean = action.payload.isPic;
      const idArr = state.chats.map((i: any) => i.id);
      const maxID = idArr.length == 0 ? 0 : Math.max(...idArr);
      const today = dayjs().format();
      let id = maxID + 1;

      const chat = {
        id,
        title,
        message: [{
          role: "system",
          content: "친구랑 대화하듯 답변해주세요.",
        }],
        usage: {
          completion_tokens: 0,
          prompt_tokens: 0,
          total_tokens: 0,
        },
        isPic,
        createDate: today,
        modifyDate: today
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
      chat.message = initialState.chats[0].message;
    },
    addChatMessage: (state, action) => {
      const chat = state.chats.filter((i: any) => i.id == action.payload.id)[0];
      if (!chat) return;

      const message = action.payload.message;
      // const usage = action.payload.usage;
      const today = dayjs().format();

      chat.modifyDate = today;
      chat.message = message;
    },
    addChatPic: (state, action) => {
      const chat = state.chats.filter((i: any) => i.id == action.payload.id)[0];
      if (!chat) return;

      const pic_messaage = action.payload.pic_messaage;
      const today = dayjs().format();

      chat.pic_message = pic_messaage;
      chat.modifyDate = today;
    },
    deleteChatMessage: (state, action) => {
      const chatId = action.payload.chatId;
      const messageIndex = action.payload.messageIndex;

      const chat = state.chats.filter((i: any) => i.id == chatId)[0];

      if(chat.isPic == true){
        chat.pic_message.splice(messageIndex, 1);  
      }else{
        chat.message.splice(messageIndex, 2);
      }
    },
    deleteAllChatMessage:(state,action) => {
      const chatId = action.payload.chatId;
      
      const chat = state.chats.filter((i: any) => i.id == chatId)[0];

      if(chat.isPic == true){
        chat.pic_message.splice(1);  
      }else{
        chat.message.splice(1);
      }
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  addChat,
  deleteChat,
  initChatMessage,
  addChatMessage,
  addChatPic,
  deleteChatMessage,
  deleteAllChatMessage
} = chatSlice.actions;
export default chatSlice.reducer;
