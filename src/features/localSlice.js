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

            const { message, user, id } = action.payload

            const key = 'id';
            console.log('Slice');
            if (!state.notifications.length) {
                state.notifications.push({ message, user, id })
                localStorage.setItem('notification', JSON.stringify(state.notifications))
            } else {

                state.notifications.push({ message, user, id })

                let uniqueObjArray = [
                    ...new Map(state.notifications.map((item) => [item["id"], item])).values(),
                ];
                console.log(uniqueObjArray);

                state.notifications = uniqueObjArray
                localStorage.setItem('notification', JSON.stringify(state.notifications))

            }

            // state.notifications.map(item => {
            //     if (item.id !== id) {
            //         state.notifications.push({ message, user, id })
            //         localStorage.setItem('notification', JSON.stringify(state.notifications))
            //     }
            // })
        },
        readNotify: (state, action) => {

        }
    }
})

export const { togglePopup, setUser, clearUser, setProfileId, addNotify } = localSlice.actions
export default localSlice.reducer