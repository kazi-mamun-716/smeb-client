import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const rootApi= createApi({
    reducerPath: "rootApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_HOST}/api/auth`,
        prepareHeaders: (headers, { getState }) => {
            const token = getState()?.auth?.token?.payload;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ["member"],
    endpoints: (builder) => ({})
});

export const userApi= createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_HOST}/api/user`,
        prepareHeaders: (headers, { getState }) => {
            const token = getState()?.auth?.token?.payload;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: [""],
    endpoints: (builder) => ({})
});

export const forumApi= createApi({
    reducerPath: "forumApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_HOST}/api/forum`,
        prepareHeaders: (headers, { getState }) => {
            const token = getState()?.auth?.token?.payload;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ["forum"],
    endpoints: (builder) => ({})
});