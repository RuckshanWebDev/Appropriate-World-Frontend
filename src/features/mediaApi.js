import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const mediaApi = createApi({
    reducerPath: 'mediaApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NODE_ENV === "production" ? 'https://api.justcreate.tv' : 'http://localhost:5001', }),
    endpoints: (builder) => ({

        getPresignedUrl: builder.query({
            query: ({ folder, fileName, fileType }) => {
                return {
                    url : '/aws/presigned-url',
                    method: "POST",
                    body: {
                        fileName, fileType, folder
                    },
                }
            }
        }),

        uploadMedia : builder.mutation({
            query: ({ presignedUrl, file }) => {
                return {
                    url: presignedUrl,
                    method: "PUT",
                    body: file,
                    headers: {
                        'Content-Type': file.type
                    }
                }
            }
        }),

        viewMediaContent : builder.query({
            query: (mediaId) => {
                return {
                    url: `/api/media/${mediaId}`,
                    method: "GET",
                }
            }
        }),

        viewALlMediaContent : builder.query({
            query: () => {
                return {
                    url: '/api/media/',
                    method: "GET",
                }
            }
        }),

        createMediaContent : builder.mutation({
            query: ({ title, type, coverImage, episodes, genre, description, artist, author }) => {
                return {
                    url: '/api/media/',
                    method: "POST",
                    'credentials': 'include',
                    body: {
                        title, type, coverImage, episodes, genre, description, artist, author
                    }
                }
            }
        }),

        editMediaContent : builder.mutation({
            query: ({ title, coverImage, episodes, contentFile, mediaId }) => {
                return {
                    url: `/api/media/${mediaId}`,
                    method: "PUT",
                    body: {
                        title, coverImage, episodes, contentFile
                    }
                }
            }
        }),

        deleteMediaContent : builder.mutation({
            query: ({ mediaId }) => {
                return {
                    url: `/api/media/${mediaId}`,
                    method: "DELETE",
                }
            }
        }),

      
    })
})


export const { useLazyGetPresignedUrlQuery, useUploadMediaMutation, useCreateMediaContentMutation, useViewALlMediaContentQuery, useLazyViewMediaContentQuery } = mediaApi
export default mediaApi;