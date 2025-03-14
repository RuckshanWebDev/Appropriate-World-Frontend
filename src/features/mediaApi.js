import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createAsyncThunk } from "@reduxjs/toolkit";

const mediaApi = createApi({
  reducerPath: "mediaApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NODE_ENV === "production" ? "https://api.justcreate.tv" : "http://localhost:5001" }),
  endpoints: (builder) => ({
    getPresignedUrl: builder.query({
      query: ({ episodes, type }) => {
        return {
          url: "/aws/presigned-url",
          method: "POST",
          body: {
            files: episodes,
            type: type,
          },
        };
      },
    }),

    uploadMedia: builder.mutation({
      query: ({ presignedUrl, file }) => {
        return {
          url: presignedUrl,
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": file.type,
          },
        };
      },
    }),

    viewMediaContent: builder.query({
      query: (mediaId) => {
        console.log(mediaId);
        return {
          url: `/api/media/${mediaId}`,
          method: "GET",
        };
      },
    }),

    viewALlMediaContent: builder.query({
      query: () => {
        return {
          url: "/api/media/",
          method: "GET",
        };
      },
    }),

    createMediaContent: builder.mutation({
      query: ({ title, type, coverImage, episodes, genre, description, artist, author }) => {
        return {
          url: "/api/media/",
          method: "POST",
          credentials: "include",
          body: {
            title,
            type,
            coverImage,
            episodes,
            genre,
            description,
            artist,
            author,
          },
        };
      },
    }),

    editMediaContent: builder.mutation({
      query: ({ title, coverImage, episodes, contentFile, mediaId }) => {
        return {
          url: `/api/media/${mediaId}`,
          method: "PUT",
          body: {
            title,
            coverImage,
            episodes,
            contentFile,
          },
        };
      },
    }),

    deleteMediaContent: builder.mutation({
      query: ({ mediaId }) => {
        return {
          url: `/api/media/${mediaId}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const uploadFileWithProgress = async ({ presignedUrl, file, onProgress }) => {
  return new Promise((resolve, reject) => {
    console.log(file);
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", presignedUrl, true);
    xhr.setRequestHeader("Content-Type", file.type);

    // Progress event listener
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded / event.total) * 100);
        onProgress(progress);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
      } else {
        reject(new Error(`Upload failed with status ${xhr.status}`));
      }
    };

    xhr.onerror = () => reject(new Error("Upload error"));

    xhr.send(file);
  });
};

export const { useLazyGetPresignedUrlQuery, useUploadMediaMutation, useCreateMediaContentMutation, useViewALlMediaContentQuery, useLazyViewMediaContentQuery, useDeleteMediaContentMutation } = mediaApi;
export default mediaApi;
