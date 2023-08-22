import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  content: 'i am content',
};


export const editorSlice = createSlice({
    name: "editor",
    initialState,
    reducers: {
      //Actions
      updateEditorContent: (state, action) => {
        state.content =  action.payload;
      },
    }
})

export const { updateEditorContent } = editorSlice.actions;
// export const editorContent = (state) => state.content;

export default editorSlice.reducer;