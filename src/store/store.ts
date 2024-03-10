import { configureStore } from '@reduxjs/toolkit'
import chat from './chat'

export const store = configureStore({
  reducer: {
    chat
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch