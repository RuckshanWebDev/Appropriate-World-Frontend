import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const paymentApi = createApi({
    reducerPath: 'paymentApi',

    baseQuery: fetchBaseQuery({ baseUrl: process.env.NODE_ENV === "production" ? 'https://appropriate-world-backend.onrender.com' : 'http://localhost:5000', }),

    endpoints: (builder) => ({

        // Create payment Intent
        createPaymentIntent: builder.query({
            query: () => {
                return {
                    'credentials': 'include',
                    'mode': 'cors',
                    'headers': {
                        'accept': 'application/json, text/plain, */*', 'content-type': 'application/json'
                    },
                    url: '/api/order/'
                }
            }
        }),

        // payment-intent
        paymentIntent: builder.mutation({
            query: ({ amount, paymentIntentId }) => {
                return {
                    url: '/api/order/payment-intent',
                    method: 'POST',
                    body: { amount, paymentIntentId },
                    'credentials': 'include',
                    'mode': 'cors',
                    'headers': {
                        'accept': 'application/json, text/plain, */*', 'content-type': 'application/json'
                    }
                }
            }
        }),

        // payment confirm
        paymentConfirm: builder.mutation({
            query: (paymentIntentId) => {
                return {
                    url: '/api/order/payment-confirm',
                    method: 'POST',
                    body: { paymentIntentId },
                    'credentials': 'include',
                    'mode': 'cors',
                    'headers': {
                        'accept': 'application/json, text/plain, */*', 'content-type': 'application/json'
                    }
                }
            }
        })

    })

})

export const { usePaymentConfirmMutation, usePaymentIntentMutation, useCreatePaymentIntentQuery } = paymentApi
export default paymentApi
