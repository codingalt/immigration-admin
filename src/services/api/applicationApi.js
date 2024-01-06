import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const applicationApi = createApi({
  reducerPath: "applicationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URI,
    prepareHeaders: async (headers, query) => {
      const authToken = localStorage.getItem("ukimmigration_token");
      headers.set("authorization", `Bearer ${authToken}`);
      return headers;
    },
    credentials: "include",
  }),
  tagTypes: ["Application"],
  endpoints: (builder) => ({
    postPhase1: builder.mutation({
      query: (data) => ({
        url: "api/application/phase1",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    postPhase2: builder.mutation({
      query: (data) => ({
        url: `api/application/phase2`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    postPhase3: builder.mutation({
      query: ({ formData, applicationId }) => ({
        url: `api/application/phase3/${applicationId}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Application"],
    }),

    postPhase4: builder.mutation({
      query: ({ data, applicationId }) => ({
        url: `api/application/phase4/${applicationId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    postGeneral: builder.mutation({
      query: ({ data, applicationId }) => ({
        url: `api/application/general/${applicationId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    postAccomodation: builder.mutation({
      query: ({ data, applicationId }) => ({
        url: `api/application/accomodation/${applicationId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    postFamily: builder.mutation({
      query: ({ data, applicationId }) => ({
        url: `api/application/family/${applicationId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    postLanguage: builder.mutation({
      query: ({ data, applicationId }) => ({
        url: `api/application/language/${applicationId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    postEducation: builder.mutation({
      query: ({ data, applicationId }) => ({
        url: `api/application/education/${applicationId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    postEmployment: builder.mutation({
      query: ({ data, applicationId }) => ({
        url: `api/application/employment/${applicationId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    postMaintenance: builder.mutation({
      query: ({ data, applicationId }) => ({
        url: `api/application/maintenance/${applicationId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    postTravel: builder.mutation({
      query: ({ data, applicationId }) => ({
        url: `api/application/travel/${applicationId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    postCharacter: builder.mutation({
      query: ({ data, applicationId }) => ({
        url: `api/application/character/${applicationId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    payWithCard: builder.mutation({
      query: (data) => ({
        url: `api/payment`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    getApplicationByUserId: builder.query({
      query: () => `api/user/application`,
      providesTags: ["Application", "AdminApi"],
    }),

    getCountries: builder.query({
      query: () => `https://restcountries.com/v3.1/all`,
      providesTags: ["Application"],
    }),

    getStatesByCountry: builder.query({
      query: (country) =>
        `https://www.universal-tutorial.com/api/states/Pakistan`,
      headers: {
        Authorization:
          "Bearer IrOdRzg7F1L6EztEjl0d2XwFXzArCjtZDT1JH6jKvCKMPv9glUv6Ug2AYIi4yXN1Srs",
      },
      providesTags: ["Application"],
    }),

    // Admin Endpoints starts
    filterApplication: builder.mutation({
      query: ({ name, caseId, country, birthDate }) => ({
        url: `api/application/search`,
        method: "POST",
        body: { filters: { name, caseId, country, birthDate } },
      }),
      invalidatesTags: ["Application"],
    }),

    getAllApplications: builder.query({
      query: () => `api/application`,
      providesTags: ["Application", "AdminApi"],
    }),

    getAllApplicationNotes: builder.query({
      query: () => `api/application/notes/get`,
      providesTags: ["Application", "AdminApi"],
    }),

    getNotificationCountAdmin: builder.query({
      query: () => `api/notification/count/admin`,
      providesTags: ["Application", "AdminApi"],
    }),

    getNotificationCountCaseWorker: builder.query({
      query: () => `api/notification/count/caseworker`,
      providesTags: ["Application", "AdminApi"],
    }),

    readNotificationAdmin: builder.mutation({
      query: () => ({
        url: `api/notification/read/admin`,
        method: "PUT",
      }),
      invalidatesTags: ["Application", "AdminApi"],
    }),

    readNotificationCaseWorker: builder.mutation({
      query: () => ({
        url: `api/notification/read/caseworker`,
        method: "PUT",
      }),
      invalidatesTags: ["Application", "AdminApi"],
    }),

    acceptInitialRequest: builder.mutation({
      query: ({ data, applicationId }) => ({
        url: `api/accept/${applicationId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    approvePhase1: builder.mutation({
      query: ({ notificationId, applicationId }) => ({
        url: `api/phase1/approve/${applicationId}`,
        method: "POST",
        body: { notificationId: notificationId },
      }),
      invalidatesTags: ["Application"],
    }),

    approvePhase2: builder.mutation({
      query: ({ notificationId, applicationId }) => ({
        url: `api/phase2/approve/${applicationId}`,
        method: "POST",
        body: { notificationId: notificationId },
      }),
      invalidatesTags: ["Application"],
    }),

    approvePhase3: builder.mutation({
      query: ({ notificationId, applicationId }) => ({
        url: `api/phase3/approve/${applicationId}`,
        method: "POST",
        body: { notificationId: notificationId },
      }),
      invalidatesTags: ["Application"],
    }),

    approvePhase4: builder.mutation({
      query: ({ notificationId, applicationId }) => ({
        url: `api/phase4/approve/${applicationId}`,
        method: "POST",
        body: { notificationId: notificationId },
      }),
      invalidatesTags: ["Application"],
    }),

    requestAPhase: builder.mutation({
      query: ({ data, applicationId }) => ({
        url: `api/phase/request/${applicationId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    updatePhaseByAdmin: builder.mutation({
      query: ({ data, phase, applicationId }) => ({
        url: `api/phase/update/${applicationId}`,
        method: "PUT",
        body: { data: data, phase: phase },
      }),
      invalidatesTags: ["Application"],
    }),

    rejectApplication: builder.mutation({
      query: (data) => ({
        url: `api/application/reject`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    addNotes: builder.mutation({
      query: ({ name, content, applicationId }) => ({
        url: `api/notes/${applicationId}`,
        method: "POST",
        body: { name: name, content: content },
      }),
      invalidatesTags: ["Application"],
    }),

    reRequestPhase1: builder.mutation({
      query: (applicationId) => ({
        url: `api/rerequest/phase1/${applicationId}`,
        method: "POST",
        body: applicationId,
      }),
      invalidatesTags: ["Application"],
    }),

    reRequestPhase4: builder.mutation({
      query: (applicationId) => ({
        url: `api/rerequest/phase4/${applicationId}`,
        method: "POST",
        body: applicationId,
      }),
      invalidatesTags: ["Application"],
    }),

    reRequestGroupPhase1: builder.mutation({
      query: (applicationId) => ({
        url: `api/rerequest/group/phase1/${applicationId}`,
        method: "POST",
        body: applicationId,
      }),
      invalidatesTags: ["Application"],
    }),

    reRequestGroupPhase4: builder.mutation({
      query: (applicationId) => ({
        url: `api/rerequest/group/phase4/${applicationId}`,
        method: "POST",
        body: applicationId,
      }),
      invalidatesTags: ["Application"],
    }),

    getApplicationDataById: builder.query({
      query: (applicationId) => `api/application/${applicationId}`,
      providesTags: ["Application", "AdminApi"],
    }),
  }),
});

export const {
  useGetApplicationByUserIdQuery,
  usePostPhase1Mutation,
  usePostPhase2Mutation,
  usePostPhase3Mutation,
  usePayWithCardMutation,
  useGetCountriesQuery,
  usePostPhase4Mutation,
  useGetStatesByCountryQuery,
  useGetAllApplicationsQuery,
  useAddNotesMutation,
  useGetApplicationDataByIdQuery,
  useAcceptInitialRequestMutation,
  useApprovePhase1Mutation,
  useApprovePhase2Mutation,
  useApprovePhase3Mutation,
  useApprovePhase4Mutation,
  useRequestAPhaseMutation,
  useUpdatePhaseByAdminMutation,
  useRejectApplicationMutation,
  useFilterApplicationMutation,
  usePostGeneralMutation,
  usePostAccomodationMutation,
  usePostFamilyMutation,
  usePostLanguageMutation,
  usePostEducationMutation,
  usePostEmploymentMutation,
  usePostMaintenanceMutation,
  usePostTravelMutation,
  usePostCharacterMutation,
  useGetNotificationCountAdminQuery,
  useReadNotificationAdminMutation,
  useGetAllApplicationNotesQuery,
  useGetNotificationCountCaseWorkerQuery,
  useReadNotificationCaseWorkerMutation,
  useReRequestPhase1Mutation,
  useReRequestPhase4Mutation,
  useReRequestGroupPhase1Mutation,
  useReRequestGroupPhase4Mutation,
} = applicationApi;
