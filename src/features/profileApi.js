import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const axiosOption = {
    origin: false,
    credentials: 'include',
    withCredentials: true,
    mode: "cors"
}

const profileApi = createApi({
    reducerPath: 'profileApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.URL || 'http://localhost:5000',
        'credentials': 'include',
        'mode': 'cors',
        'headers': {
            'accept': 'application/json, text/plain, */*', 'content-type': 'application/json'
        }
    }),

    endpoints: (builder) => ({

        // get  Profiles
        getProfile: builder.query({
            query: () => {
                return {
                    url: '/api/profile',
                    'credentials': 'include',
                    'mode': 'cors',
                    'headers': {
                        'accept': 'application/json, text/plain, */*', 'content-type': 'application/json'
                    }
                }
            },
            providesTags: ['profile'],
        }),

        // Create a profile
        createProfile: builder.mutation({
            query: (data) => ({
                url: '/api/profile',
                method: "POST",
                body: data,

            })
        }),

        // Update a profile
        updateProfile: builder.mutation({
            query: (data) => ({
                url: '/api/profile',
                method: "PUT",
                body: data,

            })
        })

    })
})

export const { useCreateProfileMutation, useGetProfileQuery, useUpdateProfileMutation, useLazyGetProfileQuery } = profileApi
export default profileApi