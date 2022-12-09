import{ configureStore } from "@reduxjs/toolkit";
import pagesReducer from '../feature/pages.slice';
import providersReducer from '../feature/providers.slice';
import collectionsReducer from '../feature/collections.slice';


export default configureStore({
    reducer:{
      pages:pagesReducer,
      providers:providersReducer,
      collections:collectionsReducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
 })