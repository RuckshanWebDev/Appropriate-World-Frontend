import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query';
import localReducer from './features/localSlice'
import blogApi from "./features/blogApi";
import userApi from "./features/userApi";
import profileApi from "./features/profileApi";
import chatApi from "./features/chatApi";
import forumApi from "./features/forumApi";
import paymentApi from "./features/paymentApi";
import feedbackApi from "./features/feedbackApi";

const store = configureStore({
    reducer: {
        local: localReducer,
        [blogApi.reducerPath]: blogApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [profileApi.reducerPath]: profileApi.reducer,
        [chatApi.reducerPath]: chatApi.reducer,
        [forumApi.reducerPath]: forumApi.reducer,
        [paymentApi.reducerPath]: paymentApi.reducer,
        [feedbackApi.reducerPath]: feedbackApi.reducer,
    },
    middleware: (getDefaultMiddleware) => (
        getDefaultMiddleware()
            .concat(blogApi.middleware)
            .concat(userApi.middleware)
            .concat(profileApi.middleware)
            .concat(chatApi.middleware)
            .concat(forumApi.middleware)
            .concat(paymentApi.middleware)
            .concat(feedbackApi.middleware)
    )
})

setupListeners(store.dispatch);

export default store