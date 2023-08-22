import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blog: [],
};


export const blogData = createSlice({
    name: "blogData",
    initialState,
    reducers: {
      //Actions
      updateBlogData: (state, action) => {
        console.log('blog',action.payload)
        state.blog =  action.payload;
      },
    }
})

export const { updateBlogData } = blogData.actions;
// export const blogContent = (state) => state.blog;

export default blogData.reducer;