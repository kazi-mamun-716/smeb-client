import { forumApi } from "./apiSlice";

const forumsApi = forumApi.injectEndpoints({
    endpoints: (builder)=>({
        createForum: builder.mutation({
            query: (data)=>({
                url: '/create',
                method: "POST",
                body: data
            }),
            invalidatesTags: ["forum"]
        }),
        getAllForum: builder.query({
            query: ()=>'/all'
        }),
        getForumById: builder.query({
            query: (id)=>`/${id}`
        }),

    })
});

export const {
    useCreateForumMutation,
    useGetAllForumQuery,
    useGetForumByIdQuery
} = forumsApi;