import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.URL || "http://localhost:5000", 'credentials': 'include',
        'mode': 'cors',
        'headers': {
            'accept': 'application/json, text/plain, */*', 'content-type': 'application/json'
        }
    }),
    endpoints: (builder) => ({

        // Login User
        loginUser: builder.mutation({
            query: ({ email, password }) => ({
                url: '/api/user/auth',
                method: 'POST',
                body: { email, password },

            }),
            invalidatesTags: ['profile'],

        }),

        // Register User
        registerUser: builder.mutation({
            query: ({ name, email, password }) => ({
                url: '/api/user/',
                method: 'POST',
                body: { name, email, password }
            }),
        }),

        // Logout User
        logoutUser: builder.mutation({
            query: () => ({
                url: '/api/user/logout',
                method: 'POST'
            }),
        }),

    })
})

export const { useLoginUserMutation, useRegisterUserMutation, useLogoutUserMutation } = userApi
export default userApi