import { eventApi } from "./apiSlice";

const eventsApi = eventApi.injectEndpoints({
  endpoints: (builder) => ({
    allEvents: builder.query({
      query: ({ page, size, filter }) =>
        `/?page=${page}&size=${size}&filter=${filter}`,
      providesTags: ["event"],
    }),
    countEvents: builder.query({
      query: (filter) => `/count?filter=${filter}`,
      providesTags: ["event"],
    }),
    eventById: builder.query({
      query: (id) => `/${id}`,
      providesTags: ["event"],
    }),
    participate: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["event"],
    }),
    checkParticipates: builder.query({
      query: (id) => `/checkParticipation/${id}`,
      providesTags: ["event"],
    }),
    nonRegisterdUserParticipate: builder.mutation({
      query: ({id, data}) => ({
        url: `/nonRegisterdParticipate/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["event"],
    }),
    checkNonRegisterParticipation: builder.mutation({
      query: ({email, id})=>({
        url: `/checkNonRegisterParticipate/${email}?event=${id}`,
        method: 'POST'
      })
    })
  }),
});

export const {
  useAllEventsQuery,
  useCountEventsQuery,
  useEventByIdQuery,
  useParticipateMutation,
  useCheckParticipatesQuery,
  useNonRegisterdUserParticipateMutation,
  useCheckNonRegisterParticipationMutation
} = eventsApi;
