import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        username:'',
        room:'',
        nickname:'',
        image:''
    }
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setUsername: (state, action) => {
            const nState = state
            nState.value.username = action.payload
            state = nState
        },
        setNickname: (state, action) => {
            const nState = state
            nState.value.nickname = action.payload
            state = nState
        },
        setImage: (state, action) => {
            const nState = state
            nState.value.image = action.payload
            state = nState
        },
        setRoom: (state, action) => {
            const nState = state
            nState.value.room = action.payload
            state = nState
        }
    }
})

export const { getChatInfo, setUsername, setNickname, setImage, setRoom } = chatSlice.actions

export default chatSlice.reducer