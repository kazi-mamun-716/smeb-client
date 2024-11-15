import { configureStore } from '@reduxjs/toolkit'
import { basicApi, eventApi, forumApi, rootApi, userApi } from '../feature/apiSlice'
import rootSlice from '../feature/rootSlice';

const store = configureStore({
    reducer: {
        [rootApi.reducerPath]: rootApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [forumApi.reducerPath]: forumApi.reducer,
        [basicApi.reducerPath]: basicApi.reducer,
        [eventApi.reducerPath]: eventApi.reducer,
        auth: rootSlice // for set header 
    },
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware()
                                            .concat(rootApi.middleware)
                                            .concat(userApi.middleware)
                                            .concat(forumApi.middleware)
                                            .concat(basicApi.middleware)
                                            .concat(eventApi.middleware)
})

export default store;