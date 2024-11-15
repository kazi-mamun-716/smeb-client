import { forumApi } from "./apiSlice";

const forumsApi = forumApi.injectEndpoints({
  endpoints: (builder) => ({
    createForum: builder.mutation({
      query: (data) => ({
        url: "/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["forum"],
    }),
    getAllForum: builder.query({
      query: ({ page, size, filter }) => `/all?page=${page}&size=${size}&filter=${filter}`,
      providesTags: ["forum"],
    }),
    countForum: builder.query({
      query: () => "/count",
    }),
    getForumById: builder.query({
      query: (id) => `/${id}`,
      providesTags: ["forum"],
    }),
    getForumByUser: builder.query({
      query: () => "/getForumByUser",
      providesTags: ["forum"]
    }),
    updateForum: builder.mutation({
      query: ({id, data}) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["forum"],
    }),
    deleteForum: builder.mutation({
      query: (id)=>({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['forum']
    }),
    countComment: builder.query({
      query: () => "/commentCount",
    }),
    createComment: builder.mutation({
      query: ({ fId, data }) => ({
        url: `/${fId}/comment`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["forum"],
    }),
  }),
});

export const {
  useCreateForumMutation,
  useGetAllForumQuery,
  useGetForumByIdQuery,
  useGetForumByUserQuery,
  useCreateCommentMutation,
  useUpdateForumMutation,
  useDeleteForumMutation,
  useCountForumQuery,
  useCountCommentQuery,
} = forumsApi;
