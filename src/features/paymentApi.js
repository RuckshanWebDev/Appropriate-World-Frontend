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
        }),

        // Get User Subscription
        getSubscriptions: builder.mutation({
            query: ({ customerId }) => {
                return {
                    url: '/api/order/subscriptions',
                    method: 'POST',
                    'credentials': 'include',
                    'body': { customerId },
                    'headers': {
                        'accept': 'application/json, text/plain, */*', 'content-type': 'application/json'
                    }
                }
            }
        }),

        cancelSubscriptions: builder.mutation({
            query: ({ subscription }) => {
                return {
                    url: '/api/order/subscriptions',
                    method: 'DELETE',
                    'credentials': 'include',
                    'body': { subscription },
                    'headers': {
                        'accept': 'application/json, text/plain, */*', 'content-type': 'application/json'
                    }
                }
            }
        }),

        createCustomer: builder.mutation({
            query: ({ profileId }) => {
                return {
                    url: '/api/order/customer',
                    method: 'POST',
                    'credentials': 'include',
                    'body': { profileId },
                    'headers': {
                        'accept': 'application/json, text/plain, */*', 'content-type': 'application/json'
                    }
                }
            }
        }),

        createSession: builder.mutation({
            query: ({ customer, price }) => {
                return {
                    url: '/api/order/session',
                    'body': { customer, price },
                    method: 'POST',
                    'credentials': 'include',
                    'headers': {
                        'accept': 'application/json, text/plain, */*', 'content-type': 'application/json'
                    }
                }
            }
        }),

        createPortalSession: builder.mutation({
            query: ({ customer, subscription }) => {
                return {
                    url: '/api/order/portal-session',
                    'body': { customer, subscription },
                    method: 'POST',
                    'credentials': 'include',
                    'headers': {
                        'accept': 'application/json, text/plain, */*', 'content-type': 'application/json'
                    }
                }
            }
        }),

        invoiceHistory: builder.mutation({
            query: ({ customer }) => {
                return {
                    url: '/api/order/billing-hostory',
                    'body': { customer },
                    method: 'POST',
                    'credentials': 'include',
                    'headers': {
                        'accept': 'application/json, text/plain, */*', 'content-type': 'application/json'
                    }
                }
            }
        }),

        getPrices: builder.query({
            query: () => ({
                url: '/api/order/config'
            })
        }),

    })

})

export const { useInvoiceHistoryMutation, useCreatePortalSessionMutation, useCancelSubscriptionsMutation, useGetPricesQuery, useCreateSessionMutation, useCreateCustomerMutation, useGetSubscriptionsMutation, usePaymentConfirmMutation, usePaymentIntentMutation, useCreatePaymentIntentQuery } = paymentApi
export default paymentApi
