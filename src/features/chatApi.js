import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const chatApi = createApi({
    reducerPath: 'chatApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NODE_ENV === "production" ? 'https://appropriate-world-backend.onrender.com' : 'http://localhost:5000', }),
    endpoints: (builder) => ({

        getCoupleChat: builder.query({
            query: ({ id }) => {
                return {
                    url: `/api/chat/${id}`,
                    'credentials': 'include',
                    'mode': 'cors',
                    'headers': {
                        'accept': 'application/json, text/plain, */*', 'content-type': 'application/json'
                    }
                }
            }
        }),

        sendMessage: builder.mutation({
            query: (data) => {
                return {
                    url: `/api/chat/`,
                    body: data,
                    method: "POST",
                    'credentials': 'include',
                    'mode': 'cors',
                    'headers': {
                        'accept': 'application/json, text/plain, */*', 'content-type': 'application/json'
                    }
                }
            }
        }),

        getotification: builder.query({
            query: (query) => ({
                url: `/api/chat/notification`,
                method: "GET",
                'credentials': 'include',
                'mode': 'cors',
                'headers': {
                    'accept': 'application/json, text/plain, */*', 'content-type': 'application/json'
                }
            })
        })

    })
})

export const { useGetotificationQuery, useGetCoupleChatQuery, useLazyGetCoupleChatQuery, useSendMessageMutation } = chatApi
export default chatApi