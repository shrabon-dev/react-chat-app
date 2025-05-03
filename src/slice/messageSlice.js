import { createSlice } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
    name:'messageSlice',
    initialState:{
        message:'',
        status:'',
    },
    reducers:{
        setMessageAlert:(state,action)=>{
            const {message,status} = action.payload;
            state.message = message;
            state.status = status;
        }
    }
})

export const  {setMessageAlert} = messageSlice.actions;
export default messageSlice.reducer;