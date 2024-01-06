import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const companyApi = createApi({
  reducerPath: "companyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URI,
    prepareHeaders: async (headers, query) => {
      const authToken = localStorage.getItem("ukimmigration_token");
      headers.set("authorization", `Bearer ${authToken}`);
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

    getApplicationsByCompany: builder.query({
      query: (companyId) => `api/company/applications/${companyId}`,
      providesTags: ["Company", "Application"],
    }),

    getGroupApplicationById: builder.query({
      query: (applicationId) => `api/company/application/${applicationId}`,
      providesTags: ["Company", "Application"],
    }),

    getCompanyDetailsById: builder.query({
      query: (companyId) => `api/company/${companyId}`,
      providesTags: ["Company", "Application"],
    }),

    sendRequestToCompanyClient: builder.mutation({
      query: (data) => ({
        url: `api/company/phase1/send`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Company", "AdminApi"],
    }),
  }),
});

export const {
  useGetAllCompaniesQuery,
  useCreateCompanyMutation,
  useGetApplicationsByCompanyQuery,
  useGetGroupApplicationByIdQuery,
  useGetCompanyDetailsByIdQuery,
  useSendRequestToCompanyClientMutation
} = companyApi;
