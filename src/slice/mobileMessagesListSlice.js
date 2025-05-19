import { createSlice } from "@reduxjs/toolkit";

export const mobileMessagesListSlice = createSlice({
    name: 'mobileMessagesList',
    initialState: {
        value: false,
    },
    reducers: {
        setMobileMessagesList: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { setMobileMessagesList } = mobileMessagesListSlice.actions;
export default mobileMessagesListSlice.reducer;
