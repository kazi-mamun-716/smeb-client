import { userApi } from "./apiSlice";

const usersApi = userApi.injectEndpoints({
  endpoints: (builder) => ({
    loggedInUser: builder.query({
      query: () => "/loggedInUser",
    }),
    emailVerification: builder.mutation({
      query: (data) => ({
        url: "/emailVerification",
        method: "POST",
        body: data,
      }),
    }),
    verifyEmail: builder.query({
      query: (id) => `/verifyEmail/${id}`,
    }),
    countMember: builder.query({
      query: () => "/countMember",
    }),
  }),
});

export const {
  useLoggedInUserQuery,
  useEmailVerificationMutation,
  useVerifyEmailQuery,
  useCountMemberQuery
} = usersApi;
