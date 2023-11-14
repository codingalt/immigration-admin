import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URI,
    prepareHeaders: async (headers, query) => {
      return headers;
    },
    credentials: "include",
  }),
  tagTypes: ["AdminApi"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => `api/users`,
      providesTags: ["AdminApi"],
    }),

    timeLeft: builder.query({
      query: () => `/timeleft`,
      providesTags: ["AdminApi"],
    }),

    createCaseWorker: builder.mutation({
      query: (data) => ({
        url: `api/caseworker`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AdminApi"],
    }),

    linkCompany: builder.mutation({
      query: ({ data, applicationId }) => ({
        url: `api/company/link/${applicationId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AdminApi"],
    }),

    filterInvoices: builder.mutation({
      query: ({ name, applicationType, caseWorkerId, from, to }) => ({
        url: `api/invoice/filter`,
        method: "POST",
        body: { filters: { name, applicationType, caseWorkerId, from, to } },
      }),
      invalidatesTags: ["AdminApi"],
    }),

    phase1Manual: builder.mutation({
      query: (data) => ({
        url: `api/phase1/manual`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AdminApi", "Application"],
    }),

    updatePhase1Manual: builder.mutation({
      query: ({ data, applicationId }) => ({
        url: `api/phase1/manual/${applicationId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AdminApi", "Application"],
    }),

    updateService: builder.mutation({
      query: ({ applicationType, applicationId }) => ({
        url: `api/service/${applicationId}`,
        method: "PUT",
        body: { applicationType: applicationType },
      }),
      invalidatesTags: ["AdminApi", "Application"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateCaseWorkerMutation,
  useLinkCompanyMutation,
  useFilterInvoicesMutation,
  usePhase1ManualMutation,
  useUpdatePhase1ManualMutation,
  useTimeLeftQuery,
  useUpdateServiceMutation
} = adminApi;
