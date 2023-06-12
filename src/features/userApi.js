import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/user", 'credentials': 'include',
        'mode': 'cors',
        'headers': {
            'accept': 'application/json, text/plain, */*', 'content-type': 'application/json'
        }
    }),
    endpoints: (builder) => ({

        // Login User
        loginUser: builder.mutation({
            query: ({ email, password }) => ({
                url: '/auth',
                method: 'POST',
                body: { email, password },

            }),
            invalidatesTags: ['profile'],

        }),

        // Register User
        registerUser: builder.mutation({
            query: ({ name, email, password }) => ({
                url: '/',
                method: 'POST',
                body: { name, email, password }
            }),
        }),

        // Logout User
        logoutUser: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST'
            }),
        }),

    })
})

export const { useLoginUserMutation, useRegisterUserMutation, useLogoutUserMutation } = userApi
export default userApi