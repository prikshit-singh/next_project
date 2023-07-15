import { configureStore } from "@reduxjs/toolkit";
import editorSlice  from "../slices/editorSlice";
import  publisherDialogueSlice  from "../slices/piblisherDialogueSlice";


//Global store
export const store = configureStore({
    reducer: {
        editorSlice: editorSlice,
        publisherDialogueSlice:publisherDialogueSlice,
    },
  })