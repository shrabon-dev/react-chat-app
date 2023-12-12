import { createSlice } from "@reduxjs/toolkit";

export const NotificationSlice = createSlice({
    name:'notification',
    initialState:{
        alert:false,
    },
    reducers:{
        setNotifySound:(state,action)=>{
            state.alert = action.payload
        }
    }
})

export const {setNotifySound} = NotificationSlice.actions;

export default NotificationSlice.reducer;