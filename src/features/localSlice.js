import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    popup: false,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    notifications: localStorage.getItem('notification') ? JSON.parse(localStorage.getItem('notification')) : [],
    notificationCount: 0,
    localContactId: ''
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
            console.log(action.payload);
            state.user.profileId = action.payload._id;
            state.user.profile = action.payload;
            localStorage.setItem('user', JSON.stringify(state.user))
        },
        clearUser: (state) => {
            state.user = null
            localStorage.removeItem('user')
        },
        addNotify: (state, action) => {
            state.notifications = action.payload[0].from
            state.notificationCount = state.notifications.length
        },
        readNotify: (state, action) => {

        }
    }
})

export const { setLocalContactId, togglePopup, setUser, clearUser, setProfileId, addNotify } = localSlice.actions
export default localSlice.reducer