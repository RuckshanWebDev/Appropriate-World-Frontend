import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query';
import localReducer from './features/localSlice'
import blogApi from "./features/blogApi";
import userApi from "./features/userApi";
import profileApi from "./features/profileApi";
import chatApi from "./features/chatApi";

const store = configureStore({
    reducer: {
        local: localReducer,
        [blogApi.reducerPath]: blogApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [profileApi.reducerPath]: profileApi.reducer,
        [chatApi.reducerPath]: chatApi.reducer,
    },
    middleware: (getDefaultMiddleware) => (
        getDefaultMiddleware().concat(blogApi.middleware).concat(userApi.middleware).concat(profileApi
            .middleware).concat(chatApi
                .middleware)
    )
})

setupListeners(store.dispatch);

export default store