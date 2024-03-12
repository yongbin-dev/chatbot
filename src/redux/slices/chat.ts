import { createSlice } from '@reduxjs/toolkit'
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs'

export interface ChatState {
  chats: [{
    id: number
    chatMessage: [{
      message: ChatCompletionMessageParam,
      result: string,
      date: any,
    }],
    createDate: any
  }]
}

const initialState: ChatState = {
  chats: [{
    id: 0,
    chatMessage: [{
      message: {
        "role": "user",
        "content": "친구랑 대화하듯 답변해주세요.",
      },
      result: "",
      date: "",
    }],
    createDate: "",
  }]
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addChatMessage: (state, action) => {

      const chat = state.chats.filter( (i : any) => i.id == action.payload.id)[0];
      if(!chat) return;

      const message = action.payload.message;
      const result = action.payload.result;

      const data = {
        message,
        result,
        date : "" , 
      }

      chat.chatMessage.push(data);
    },

  },
})

// Action creators are generated for each case reducer function
export const { addChatMessage } = chatSlice.actions
export default chatSlice.reducer