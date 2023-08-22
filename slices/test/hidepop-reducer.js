import {createSlice,PayloadAction} from "@reduxjs/toolkit"

const initialState = {
    value: {
        displaypopupState:false
    }
}

export const hidepopup = createSlice({
    name:"hidepopup",
    initialState,
    reducers:{
        displaypopup:(state,action) => {
            return  {value: action.payload}
            
        }
    }
})

export const {displaypopup} =  hidepopup.actions;
export default hidepopup.reducer;