import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs'

export interface ChatState {
  value: number,
  message : Array<ChatCompletionMessageParam>
}

const initialState: ChatState = {
  value: 0,
  message : [{
    "role": "user",
    "content": "친구랑 대화하듯 답변해주세요."
  }]
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addChatMessage : (state , action) =>{
      state.message.push(action.payload);
    },
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { addChatMessage ,  increment, decrement, incrementByAmount } = chatSlice.actions
export default chatSlice.reducer