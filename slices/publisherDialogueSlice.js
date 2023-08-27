import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  state:false
}


export const publisherDialogueSlice = createSlice({
    name: "publisherDialogue",
    initialState,
    reducers: {
      //Actions
      toggolDialogue: (state, action) => {
        console.log('state updated',action.payload)
        state.state =  action.payload;
      },
    }
})

export const { toggolDialogue } = publisherDialogueSlice.actions;
// export const publisherDialogue = (state) => state.state

export default publisherDialogueSlice.reducer;