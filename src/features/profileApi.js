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
        baseUrl: 'http://localhost:5000/api/profile',
        credentials: 'include',
        withCredentials: true,
    }),

    endpoints: (builder) => ({

        // get  Profiles
        getProfile: builder.query({
            query: () => {
                return {
                    url: '/',
                    headers: { withCredentials: true }
                }
            }
        }),

        // Create a profile
        createProfile: builder.mutation({
            query: (data) => ({
                url: '/',
                method: "POST",
                body: data
            })
        }),

        // Update a profile
        updateProfile: builder.mutation({
            query: (data) => ({
                url: '/',
                method: "PUT",
                body: data
            })
        })

    })
})

export const { useCreateProfileMutation, useGetProfileQuery, useUpdateProfileMutation } = profileApi
export default profileApi