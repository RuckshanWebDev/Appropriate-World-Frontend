import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const feedbackApi = createApi({
    reducerPath: 'feedbackApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NODE_ENV === "production" ? 'https://api.justcreate.tv' : 'http://localhost:5001', }),
    endpoints: (builder) => ({

        createFeedback: builder.mutation({
            query: (data) => {

                console.log(data);

                return {
                    url: '/api/feedback',
                    method: "POST",
                    body: data,
                    'credentials': 'include',
                    'mode': 'cors',
                    'headers': {
                        'accept': 'application/json, text/plain, */*', 'content-type': 'application/json'
                    }
                }
            }
        }),


    })
})


export const { useCreateFeedbackMutation } = feedbackApi
export default feedbackApi;