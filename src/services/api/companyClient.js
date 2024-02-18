import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const companyClientApi = createApi({
  reducerPath: "companyClientApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URI,
    prepareHeaders: async (headers, query) => {
      const authToken = localStorage.getItem("ukimmigration_token");
      headers.set("authorization", `Bearer ${authToken}`);
      return headers;
    },
    credentials: "include",
  }),
  tagTypes: ["companyClient"],
  endpoints: (builder) => ({
    getAllCompanies: builder.query({
      query: () => `api/companies`,
      providesTags: ["companyClient", "Application"],
    }),

    getGroupClientAppById: builder.query({
      query: (applicationId) => `api/company/application/${applicationId}`,
      providesTags: ["companyClient", "AdminApi", "Application"],
    }),

    getGroupClientAppByUserId: builder.query({
      query: () => `api/company/user/application`,
      providesTags: ["companyClient", "Application"],
    }),

    acceptGroupClientRequest: builder.mutation({
      query: ({ data, applicationId }) => ({
        url: `api/company/accept/${applicationId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["companyClient", "Application"],
    }),

    approveGroupClientPhase1: builder.mutation({
      query: ({ data, applicationId }) => ({
        url: `api/company/phase1/approve/${applicationId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["companyClient", "Application"],
    }),

    approveGroupClientPhase2: builder.mutation({
      query: ({ data, applicationId }) => ({
        url: `api/company/phase2/approve/${applicationId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["companyClient", "Application"],
    }),

    approveGroupClientPhase3: builder.mutation({
      query: ({ data, applicationId }) => ({
        url: `api/company/phase3/approve/${applicationId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["companyClient", "Application"],
    }),

    approveGroupClientPhase4: builder.mutation({
      query: ({ data, applicationId }) => ({
        url: `api/company/phase4/approve/${applicationId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["companyClient", "Application"],
    }),

    finalGroupConfirmation: builder.mutation({
      query: ({ formData, applicationId }) => ({
        url: `api/group/finalConfirmation/${applicationId}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Application"],
    }),

    updateGroupPhaseByAdmin: builder.mutation({
      query: ({ data, phase, applicationId }) => ({
        url: `api/phase/group/update/${applicationId}`,
        method: "PUT",
        body: { data: data, phase: phase },
      }),
      invalidatesTags: ["Application", "companyClient", "AdminApi"],
    }),

    requestGroupPhase: builder.mutation({
      query: ({ data, applicationId }) => ({
        url: `api/company/phase/request/${applicationId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application", "companyClient", "AdminApi"],
    }),

    assignGroupApplicationToCaseWorker: builder.mutation({
      query: (data) => ({
        url: `api/group/application/assign`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CaseWorker"],
    }),

    linkGroupCompany: builder.mutation({
      query: ({ data, applicationId }) => ({
        url: `api/company/group/link/${applicationId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AdminApi", "CaseWorker", "Application"],
    }),

    addNotesGroup: builder.mutation({
      query: ({ name, content, applicationId }) => ({
        url: `api/group/notes/${applicationId}`,
        method: "POST",
        body: { name: name, content: content },
      }),
      invalidatesTags: ["Application", "AdminApi"],
    }),

    getAllGroupApplications: builder.query({
      query: () => `api/group/application`,
      providesTags: ["Application", "AdminApi"],
    }),

    rejectGroupApplication: builder.mutation({
      query: (data) => ({
        url: `api/group/application/reject`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    updateGroupService: builder.mutation({
      query: ({ applicationType, applicationId }) => ({
        url: `api/group/service/${applicationId}`,
        method: "PUT",
        body: { applicationType: applicationType },
      }),
      invalidatesTags: ["AdminApi", "Application"],
    }),

    postGroupGeneral: builder.mutation({
      query: ({ data, applicationId }) => ({
        url: `api/group/application/general/${applicationId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    postGroupAccomodation: builder.mutation({
      query: ({ data, applicationId }) => ({
        url: `api/group/application/accomodation/${applicationId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    postGroupFamily: builder.mutation({
      query: ({ data, applicationId }) => ({
        url: `api/group/application/family/${applicationId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    postGroupLanguage: builder.mutation({
      query: ({ data, applicationId }) => ({
        url: `api/group/application/language/${applicationId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    postGroupEducation: builder.mutation({
      query: ({ data, applicationId }) => ({
        url: `api/group/application/education/${applicationId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    postGroupEmployment: builder.mutation({
      query: ({ data, applicationId }) => ({
        url: `api/group/application/employment/${applicationId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    postGroupMaintenance: builder.mutation({
      query: ({ data, applicationId }) => ({
        url: `api/group/application/maintenance/${applicationId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    postGroupTravel: builder.mutation({
      query: ({ data, applicationId }) => ({
        url: `api/group/application/travel/${applicationId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    postGroupCharacter: builder.mutation({
      query: ({ data, applicationId }) => ({
        url: `api/group/application/character/${applicationId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),
  }),
});

export const {
  useGetAllCompaniesQuery,
  useAcceptGroupClientRequestMutation,
  useApproveGroupClientPhase1Mutation,
  useApproveGroupClientPhase2Mutation,
  useApproveGroupClientPhase3Mutation,
  useApproveGroupClientPhase4Mutation,
  useGetGroupClientAppByIdQuery,
  useGetGroupClientAppByUserIdQuery,
  useAssignGroupApplicationToCaseWorkerMutation,
  useAddNotesGroupMutation,
  useGetAllGroupApplicationsQuery,
  useUpdateGroupServiceMutation,
  useRejectGroupApplicationMutation,
  useLinkGroupCompanyMutation,
  useUpdateGroupPhaseByAdminMutation,
  useRequestGroupPhaseMutation,
  usePostGroupGeneralMutation,
  usePostGroupAccomodationMutation,
  usePostGroupFamilyMutation,
  usePostGroupLanguageMutation,
  usePostGroupEducationMutation,
  usePostGroupEmploymentMutation,
  usePostGroupMaintenanceMutation,
  usePostGroupTravelMutation,
  usePostGroupCharacterMutation,
  useFinalGroupConfirmationMutation
} = companyClientApi;
