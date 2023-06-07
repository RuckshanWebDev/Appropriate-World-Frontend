import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const blogApi = createApi({
    reducerPath: 'blogApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/', method: "GET" }),
    endpoints: (builder) => ({

        getBlogs: builder.query({
            query: () => {
                return 'api/blog/all'
            }
        }),

    })
})


export const { useGetBlogsQuery } = blogApi
export default blogApi;