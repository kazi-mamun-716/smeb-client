import { rootApi } from "./apiSlice";

const authApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),
    addMember: builder.mutation({
      query: (data) => ({
        url: "/addMember",
        method: "POST",
        body: data,
      }),
    }),
    allMember: builder.query({
      query: ({page, size})=>`/members?page=${page}&size=${size}`,
      providesTags: ['member']
    }),
    approveMember: builder.mutation({
      query: ({id, data}) =>({
        url: `/approveMember?id=${id}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ["member"]
    }),
    deletMember: builder.mutation({
      query: (id)=>({
        url: `/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["member"]
    })
  }),
});

export const { 
  useRegisterMutation, 
  useLoginMutation,
  useAddMemberMutation,
  useAllMemberQuery,
  useApproveMemberMutation,
  useDeletMemberMutation
} = authApi;
