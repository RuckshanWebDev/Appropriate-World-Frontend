import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const axiosOption = {
  origin: false,
  credentials: "include",
  withCredentials: true,
  mode: "cors",
};

const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NODE_ENV === "production" ? "https://api.justcreate.tv" : "http://localhost:5001",
    credentials: "include",
    mode: "cors",
    headers: {
      accept: "application/json, text/plain, */*",
      "content-type": "application/json",
    },
  }),

  endpoints: (builder) => ({
    // get  Profiles
    getProfile: builder.query({
      query: () => {
        return {
          url: "/api/profile",
          credentials: "include",
          mode: "cors",
          headers: {
            accept: "application/json, text/plain, */*",
            "content-type": "application/json",
          },
        };
      },
      providesTags: ["profile"],
    }),

    // Create a profile
    createProfile: builder.mutation({
      query: (data) => ({
        url: "/api/profile",
        method: "POST",
        body: data,
      }),
    }),

    // Update a profile
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/api/profile",
        method: "PUT",
        body: data,
      }),
    }),

    // Get Signle Profile
    getSingleProfile: builder.query({
      query: ({ id }) => ({
        url: `api/profile/${id}`,
        method: "GET",
      }),
    }),

    // Add Friend
    addFriend: builder.mutation({
      query: ({ id, friendId }) => {
        console.log(id, friendId);
        return {
          url: `api/profile/add/${id}`,
          method: "POST",
          body: { friendId },
        };
      },
    }),

    // Remove Friend
    removeFriend: builder.mutation({
      query: ({ id, friendId }) => {
        return {
          url: `api/profile/remove/${id}`,
          method: "POST",
          body: { friendId },
        };
      },
    }),
  }),
});

export const { useGetSingleProfileQuery, useCreateProfileMutation, useGetProfileQuery, useUpdateProfileMutation, useLazyGetProfileQuery, useAddFriendMutation, useRemoveFriendMutation } = profileApi;
export default profileApi;
