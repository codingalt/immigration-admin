import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URI,
    prepareHeaders: async (headers, query) => {
      return headers;
    },
    credentials: "include",
  }),
  tagTypes: ["Chat"],
  endpoints: (builder) => ({
    getUserMessages: builder.query({
      query: (chatId) => `api/message/${chatId}`,
      providesTags: ["Chat"],
    }),

    sendMessage: builder.mutation({
      query: (data) => ({
        url: `api/message`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Chat"],
    }),

    getUserChats: builder.query({
      query: () => `api/chats`,
      providesTags: ["Chat"],
    }),

    getAllChats: builder.query({
      query: () => `api/chats/all`,
      providesTags: ["Chat"],
    }),

    getChatByApplicationId: builder.query({
      query: (applicationId) => `api/chat/${applicationId}`,
      providesTags: ["Chat"],
    }),
  }),
});

export const {
  useGetUserChatsQuery,
  useGetUserMessagesQuery,
  useSendMessageMutation,
  useGetChatByApplicationIdQuery,
  useGetAllChatsQuery
} = chatApi;
