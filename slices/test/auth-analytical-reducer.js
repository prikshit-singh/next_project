import {createSlice,PayloadAction} from "@reduxjs/toolkit"

const initialState = {
    value: {
        customerId:'',
        Ip:'',
        city:'',
        state:'',
        country:'',
        mobileno:'',
        otpVerrified:false,
        suplierno:'',
        SupplierUsername:'',
        CustomerName: '',
        suplierToken:''
    }
}

export const auth = createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action) => {
            return  {value: action.payload}
        }
    }
})

export const {login} =  auth.actions;
export default auth.reducer;