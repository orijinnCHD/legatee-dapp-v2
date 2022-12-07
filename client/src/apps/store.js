import{ configureStore } from "@reduxjs/toolkit";
import pagesReducer from '../feature/pages.slice';


export default configureStore({
    reducer:{
      pages:pagesReducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
 })