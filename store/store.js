"use client"

import { configureStore,combineReducers} from '@reduxjs/toolkit';
// import storage from 'redux-persist/lib/storage';
import editorSlice from "../slices/editorSlice";
import publisherDialogueSlice from "../slices/publisherDialogueSlice";
import userData from "../slices/user/user";
import blogData from "../slices/blog/blog";
const middleware = (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck:false
    });

    // const persistConfig = {
    //     key: 'root', // Key for local storage
    //     storage,
    //   };
           

const reducers = {
    editorSlice,
    publisherDialogueSlice,
    userData,
    blogData,
}

// const persistedReducer = persistReducer(persistConfig, combineReducers(reducers)); 


let store = configureStore({
    reducer: reducers,
    // middleware,
});

// export const persistor = persistStore(store);

export default store 