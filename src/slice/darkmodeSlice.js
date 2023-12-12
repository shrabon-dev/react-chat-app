import { createSlice } from "@reduxjs/toolkit";


export const DarkModeSlice = createSlice({
    
    name:'darkmode',
    initialState: {
        value: false,
    },
    reducers:{
       darkmode : (state,action)=>{
        state.value = action.payload;

       }
    }
})


export const {darkmode} = DarkModeSlice.actions

export default DarkModeSlice.reducer