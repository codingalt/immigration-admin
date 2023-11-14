import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const companyApi = createApi({
  reducerPath: "companyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URI,
    prepareHeaders: async (headers, query) => {
      return headers;
    },
    credentials: "include",
  }),
  tagTypes: ["Company"],
  endpoints: (builder) => ({
    getAllCompanies: builder.query({
      query: () => `api/companies`,
      providesTags: ["Company"],
    }),

    createCompany: builder.mutation({
      query: (data) => ({
        url: `api/company`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Company"],
    }),
  }),
});

export const {
  useGetAllCompaniesQuery,
  useCreateCompanyMutation
} = companyApi;
