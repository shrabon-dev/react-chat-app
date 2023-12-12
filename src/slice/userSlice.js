import { createSlice } from '@reduxjs/toolkit'



export const userLoginInfoSlice = createSlice({
  name: 'user',
  initialState :{
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
  },
  reducers: {

    userLoginInfo : (state,action) => {
       state.userInfo = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { userLoginInfo } = userLoginInfoSlice.actions

export default userLoginInfoSlice.reducer