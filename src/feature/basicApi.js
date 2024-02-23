import { basicApi } from "./apiSlice";

const basicsApi = basicApi.injectEndpoints({
    endpoints: (builder)=>({
        createAcademi: builder.mutation({
            query: (data)=>({
                url: '/academi',
                method: "POST",
                body: data
            }),
            invalidatesTags: ["academi"]
        }),
        getAllAcademi: builder.query({
            query: ()=>'/academi',
            providesTags: ["academi"]
        })

    })
});

export const {
    useCreateAcademiMutation,
    useGetAllAcademiQuery
} = basicsApi;
