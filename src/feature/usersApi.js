import { userApi } from "./apiSlice";

const usersApi = userApi.injectEndpoints({
  endpoints: (builder) => ({
    loggedInUser: builder.query({
      query: () => "/loggedInUser",
      providesTags: ["user"],
    }),
    singleUser: builder.query({
      query: (id) => `singleUser/${id}`,
    }),
    getAllMember: builder.query({
      query: ({ page, size, filter }) =>
        `/members?page=${page}&size=${size}&filter=${filter}`,
    }),
    countMember: builder.query({
      query: (filter) => `/count?filter=active`,
    }),
    emailVerification: builder.mutation({
      query: (data) => ({
        url: "/emailVerification",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    uploadDoc: builder.mutation({
      query: (data) => ({
        url: "/uploadDoc",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    verifyVCode: builder.mutation({
      query: (data) => ({
        url: "/verifyVCode",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    passChange: builder.mutation({
      query: (data) => ({
        url: "/changePassword",
        method: "PUT",
        body: data,
      }),
    }),
    forgotPass: builder.mutation({
      query: (data) => ({
        url: "/forgotPass",
        method: "POST",
        body: data,
      }),
    }),
    passReset: builder.mutation({
      query: (data) => ({
        url: `/resetPass`,
        method: "PUT",
        body: data,
      }),
    }),
    paymentRequest: builder.mutation({
      query: (data) => ({
        url: "/makePaymentRequest",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["payments"],
    }),
    payments: builder.query({
      query: () => "/myPayments",
      providesTags: ["payments"],
    }),
    deletePaymentReq: builder.mutation({
      query: (id) => ({
        url: `/payment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["payments"],
    }),
  }),
});

export const {
  useLoggedInUserQuery,
  useSingleUserQuery,
  useGetAllMemberQuery,
  useCountMemberQuery,
  useEmailVerificationMutation,
  useUploadDocMutation,
  usePassChangeMutation,
  useForgotPassMutation,
  usePassResetMutation,
  useVerifyVCodeMutation,
  usePaymentRequestMutation,
  usePaymentsQuery,
  useDeletePaymentReqMutation,
} = usersApi;
