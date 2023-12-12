import { configureStore } from "@reduxjs/toolkit";
import activeChatSlice from "../slice/activeChatSlice";
import  userLoginInfoSlice  from "../slice/userSlice";
import darkmodeSlice from "../slice/darkmodeSlice";
import  NotificationSlice  from "../slice/NotificationSclice";
export const store = configureStore({
  reducer: {
   activechat: activeChatSlice,
   userLoginInfo: userLoginInfoSlice,
   darkmode: darkmodeSlice,
   notificationSet: NotificationSlice,
  },
})