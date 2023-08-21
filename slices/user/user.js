import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
};


export const userData = createSlice({
    name: "userData",
    initialState,
    reducers: {
      //Actions
      updateUserData: (state, action) => {
        console.log('user',action.payload)
        state.content =  action.payload;
      },
    }
})

export const { updateUserData } = userData.actions;
// export const userContent = (state) => state.content;

export default userData.reducer;