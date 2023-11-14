import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URI,
    prepareHeaders: async (headers, query) => {
      // headers.set("Content-Type", "application/json"),
      //   headers.set("Accept", "application/json");
      return headers;
    },
    credentials: "include",
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    auth: builder.query({
      query: () => ({
        url: "api/auth",
        method: "GET",
      }),
    }),

    signupUser: builder.mutation({
      query: (data) => ({
        url: "api/signup",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    loginpUser: builder.mutation({
      query: (data) => ({
        url: "api/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    verifyEmail: builder.mutation({
      query: (data) => ({
        url: `api/${data.userId}/verify/${data.token}`,
        method: "PUT",
      }),
      invalidatesTags: ["Users"],
    }),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "api/forgot-password",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    resetPassword: builder.mutation({
      query: (data) => ({
        url: `api/reset-password/${data.userId}/${data.token}`,
        method: "POST",
      }),
      invalidatesTags: ["Users"],
    }),

    createNewPassword: builder.mutation({
      query: (data) => ({
        url: `api/new-password`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: `api/changepassword`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    updateUserData: builder.mutation({
      query: (formData) => ({
        url: `api/user/update`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Users"],
    }),

    verifyOtp: builder.mutation({
      query: ({ phone, otp, fcmToken }) => ({
        url: "otp/verify",
        method: "POST",
        body: { phone, otp, fcmToken },
      }),
      invalidatesTags: ["Users"],
    }),

    logout: builder.mutation({
      query: () => ({
        url: "api/logout",
        method: "POST",
      }),
      invalidatesTags: ["Users"],
    }),

    paymentIntent: builder.mutation({
      query: (data) => ({
        url: "api/payment-intent",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    verifyCaptcha: builder.mutation({
      query: (data) => ({
        url: "api/verify-captcha",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    getClientNotification: builder.query({
      query: () => ({
        url: "api/notification",
        method: "GET",
      }),
    }),

    getPhaseNotification: builder.query({
      query: () => ({
        url: "api/phases/notification",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useSignupUserMutation,
  useVerifyOtpMutation,
  useGetUserQuery,
  useAuthQuery,
  useLoginpUserMutation,
  useVerifyEmailMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useCreateNewPasswordMutation,
  useUpdateUserDataMutation,
  useChangePasswordMutation,
  useLogoutMutation,
  usePaymentIntentMutation,
  useVerifyCaptchaMutation,
  useGetClientNotificationQuery,
  useGetPhaseNotificationQuery
} = userApi;
