import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
export interface CheckLoginState {
    value: boolean
}
const initialState: CheckLoginState = {
    value: false,
}

export const checkLogin = createSlice({
    name: 'checkLogin',
    initialState,
    reducers: {
        login: (state) => {
            state.value = true
        },
        logout: (state) => {
            state.value = false
        }
    },
})

// Action creators are generated for each case reducer function
export const { login, logout } = checkLogin.actions

export default checkLogin.reducer