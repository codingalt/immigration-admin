import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const caseworkerApi = createApi({
  reducerPath: "caseworkerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URI,
    prepareHeaders: async (headers, query) => {
      const authToken = localStorage.getItem("ukimmigration_token");
      headers.set("authorization", `Bearer ${authToken}`);
      return headers;
    },
    credentials: "include",
  }),
  tagTypes: ["CaseWorker"],
  endpoints: (builder) => ({
    getCaseWorker: builder.query({
      query: () => `api/caseworker`,
      providesTags: ["CaseWorker", "AdminApi"],
    }),

    createCaseWorker: builder.mutation({
      query: (data) => ({
        url: `api/caseworker`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CaseWorker"],
    }),

    filterCaseWorker: builder.mutation({
      query: (data) => ({
        url: `api/caseworker/search`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CaseWorker"],
    }),

    updateCaseWorker: builder.mutation({
      query: (data) => ({
        url: `api/caseworker`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["CaseWorker"],
    }),

    assignApplicationToCaseWorker: builder.mutation({
      query: (data) => ({
        url: `api/application/assign`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CaseWorker"],
    }),
  }),
});

export const {
  useGetCaseWorkerQuery,
  useCreateCaseWorkerMutation,
  useFilterCaseWorkerMutation,
  useUpdateCaseWorkerMutation,
  useAssignApplicationToCaseWorkerMutation
} = caseworkerApi;
