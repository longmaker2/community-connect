import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import profileReducer from "../features/profileSlice";
import searchReducer from "../features/searchSlice";
import bookingReducer from "../features/bookingSlice";
import chatReducer from "../features/chatSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    search: searchReducer,
    booking: bookingReducer,
    chat: chatReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;