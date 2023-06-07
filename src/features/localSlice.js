import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    popup: false,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
}

const localSlice = createSlice({
    name: "local",
    initialState,
    reducers: {
        togglePopup: (state) => {
            state.popup = !state.popup
        },
        setUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload))
        },
        clearUser: (state) => {
            state.user = null
            localStorage.removeItem('user')
        }
    }
})

export const { togglePopup, setUser, clearUser } = localSlice.actions
export default localSlice.reducer