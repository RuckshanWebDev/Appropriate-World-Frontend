import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    popup: false,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    notifications: localStorage.getItem('notification') ? JSON.parse(localStorage.getItem('notification')) : []
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
        setProfileId: (state, action) => {
            state.user.profileId = action.payload;
            localStorage.setItem('user', JSON.stringify(state.user))
        },
        clearUser: (state) => {
            state.user = null
            localStorage.removeItem('user')
        },
        addNotify: (state, action) => {

            state.notifications = action.payload

        },
        readNotify: (state, action) => {

        }
    }
})

export const { togglePopup, setUser, clearUser, setProfileId, addNotify } = localSlice.actions
export default localSlice.reducer