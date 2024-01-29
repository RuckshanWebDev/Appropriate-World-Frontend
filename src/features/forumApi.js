import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const forumApi = createApi({
    reducerPath: 'forumApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NODE_ENV === "production" ? 'http://api.justcreate.tv' : 'http://localhost:5000', }),
    endpoints: (builder) => ({

        // All Tweets
        getAllTweets: builder.query({
            query: () => {
                return '/api/forum/all'
            }
        }),

        // Create Tweet
        createTweet: builder.mutation({
            query: (data) => {
                return {
                    url: '/api/forum',
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

        // Like TWEET
        likeTweet: builder.mutation({
            query: ({ id, liked }) => {

                return {
                    url: `/api/forum/like/${id}/${liked}`,
                    method: "POST",
                    'credentials': 'include',
                    'mode': 'cors',
                    'headers': {
                        'accept': 'application/json, text/plain, */*', 'content-type': 'application/json'
                    }
                }
            }
        }),

        // Delete
        deleteTweet: builder.mutation({
            query: ({ id }) => {

                return {
                    url: `/api/forum/${id}`,
                    method: "DELETE",
                    'credentials': 'include',
                    'mode': 'cors',
                    'headers': {
                        'accept': 'application/json, text/plain, */*', 'content-type': 'application/json'
                    }
                }
            }
        }),

        // Comment
        commentTweet: builder.mutation({
            query: ({ id, data }) => {
                return ({
                    url: `api/forum/comment/${id}`,
                    method: 'POST',
                    body: { comment: data.comment, commetedUser: data.commetedUser },
                    'credentials': 'include',
                    'mode': 'cors',
                    'headers': {
                        'accept': 'application/json, text/plain, */*', 'content-type': 'application/json'
                    }
                })
            }
        })

    })


})

export const { useCommentTweetMutation, useGetAllTweetsQuery, useCreateTweetMutation, useLikeTweetMutation, useDeleteTweetMutation } = forumApi
export default forumApi
