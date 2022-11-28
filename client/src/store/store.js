import { configureStore } from "@reduxjs/toolkit";
import chatReducer from './chats/chatSlice'

export const store = configureStore({
    reducer: {
        chat: chatReducer,
    }
})