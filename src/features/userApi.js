import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NODE_ENV === "production" ? 'https://api.justcreate.tv' : 'http://localhost:5001', 'credentials': 'include',
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

        // Forgot Password
        forgotPassword: builder.mutation({
            query: ({ email }) => {
                return {
                    url: `/api/user/forgot-password`,
                    method: 'POST',
                    body: { email }
                }
            }
        }),

        resetPassword: builder.mutation({

            query: ({ token, password }) => {
                return {
                    url: `/api/user/reset-password/${token}`,
                    method: 'POST',
                    body: { newPassword: password }
                }
            }

        })

    })
})

export const { useLoginUserMutation, useRegisterUserMutation, useLogoutUserMutation, useForgotPasswordMutation, useResetPasswordMutation } = userApi
export default userApi