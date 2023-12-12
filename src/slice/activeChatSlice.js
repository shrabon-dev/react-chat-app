import { createSlice } from '@reduxjs/toolkit'



export const activeChatSlice = createSlice({
  name: 'activechat',
  initialState :{
    value: null,
  },
  reducers: {

    activechat : (state,action) => {
       state.value = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { activechat } = activeChatSlice.actions

export default activeChatSlice.reducer