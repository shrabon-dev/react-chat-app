import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  popup: false,
  type: '',
  data: []
};

export const SidebarModalSlice = createSlice({
  name: 'SidebarModal',
  initialState,
  reducers: {
    setSidebarModal: (state, action) => {
      const { popup, type, data } = action.payload;
      state.popup = popup;
      state.type = type;
      state.data = data;
    },
    closeSidebarModal: (state) => {
      state.popup = false;
      state.type = '';
      state.data = [];
    }
  }
});

export const { setSidebarModal, closeSidebarModal } = SidebarModalSlice.actions;
export default SidebarModalSlice.reducer;
