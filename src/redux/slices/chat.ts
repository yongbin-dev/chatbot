import { ModelType } from "@/constants/modelConstants";
import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const PREFIX_ID = "chat-";

export interface ChatState {
  chats: [
    {
      id: string;
      title: string;
      message: any;
      model : ModelType,
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
  ]
  activeChatId : string
}

// isPic: false,
// picUrl: "",
// date: "", 

const initialState: ChatState = {
  chats: [
    {
      id: PREFIX_ID + 0,
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
      model : ModelType.GPT,
    },
  ],
  activeChatId : PREFIX_ID + 0
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveChatId : (state , action) => {
      state.activeChatId = action.payload;
    },
    changeSystemMessage : (state ,action) => {
      const chatId : number = action.payload.chatId;
      const systemMessage : string = action.payload.message;

      const chat = state.chats.filter(i => i.id == PREFIX_ID+chatId)[0]
      chat.message.filter((i : any) => i.role == 'system')[0].content = systemMessage;
    },
    addChat: (state, action) => {
      const title : string  = action.payload.title;
      const isPic : boolean = action.payload.isPic;
      const model : ModelType = action.payload.model;

      const idArr = state.chats.map((i: any) => {
        const id : string = i.id;
        const idNum = Number(id.split('-')[1])
        return idNum;
      });

      const maxID = idArr.length == 0 ? 0 : Math.max(...idArr);
      const today = dayjs().format();
      let id = PREFIX_ID + maxID + 1;

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
        model,
        createDate: today,
        modifyDate: today,
      };

      state.chats.push(chat);
    },
    deleteChat: (state, action) => {
      const id = action.payload.id;
      state.chats.map((i: any, index: number) => {
        if (i.id == id) {
          state.chats.splice(index, 1);
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

      const pic_message = action.payload.pic_message;
      const today = dayjs().format();

      chat.pic_message = pic_message;
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
  changeSystemMessage,
  addChat,
  deleteChat,
  initChatMessage,
  addChatMessage,
  addChatPic,
  deleteChatMessage,
  deleteAllChatMessage,
  setActiveChatId,
} = chatSlice.actions;
export default chatSlice.reducer;
