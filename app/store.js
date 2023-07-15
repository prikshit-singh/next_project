import { configureStore } from "@reduxjs/toolkit";
import editorSlice  from "../slices/editorSlice";


//Global store
export const store = configureStore({
    reducer: {
        editorSlice: editorSlice,
    },
  })