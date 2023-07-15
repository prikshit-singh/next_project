import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  state:true
}


export const publisherDialogueSlice = createSlice({
    name: "publisherDialogue",
    initialState,
    reducers: {
      //Actions
      toggolDialogue: (state, action) => {
        state.state =  action.payload;
      },
    }
})

export const { toggolDialogue } = publisherDialogueSlice.actions;

export default publisherDialogueSlice.reducer;