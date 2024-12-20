import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const blogApi = createApi({
    reducerPath: 'blogApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NODE_ENV === "production" ? 'https://api.justcreate.tv' : 'http://localhost:5001', }),
    endpoints: (builder) => ({

        getBlogs: builder.query({
            query: () => {
                return '/api/blog/all'
            }
        }),

        getSigleBlogs: builder.query({
            query: (url = '') => {
                return `/api/blog/${url}`
            }
        }),

        getContact: builder.query({
            query: ({page, limit, search}) => {
                return {
                    url: `/api/profile/contact?page=${page}&limit=${limit}&search=${search}`,
                    method: "GET",
                    'credentials': 'include',
                    'mode': 'cors',
                    'headers': {
                        'accept': 'application/json, text/plain, */*', 'content-type': 'application/json'
                    }
                }
            }
        }),

        createBlog: builder.mutation({
            query: (data) => {
                return {
                    url: '/api/blog',
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

        deleteBlog: builder.mutation({

            query: ({ id }) => {
                console.log(id);
                return {
                    url: `/api/blog/${id}`,
                    method: "DELETE",
                    'credentials': 'include',
                    'mode': 'cors',
                    'headers': {
                        'accept': 'application/json, text/plain, */*', 'content-type': 'application/json'
                    }
                }
            }
        }),

        updateBlog: builder.mutation({
            query: (data) => {
                return {
                    url: '/api/blog',
                    method: "POST",
                    body: data,
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


export const { useDeleteBlogMutation, useLazyGetContactQuery,  useGetContactQuery, useGetBlogsQuery, useGetSigleBlogsQuery, useCreateBlogMutation } = blogApi
export default blogApi;