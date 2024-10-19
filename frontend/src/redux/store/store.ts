import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import serviceReducer from "../slices/servicesSlice";
import reviewsReducer from "../slices/reviewsSlice";
import profileReducer from "../slices/profileSlice";
import authReducer from "../slices/userSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// Configure the store with all necessary reducers
export const store = configureStore({
  reducer: {
    user: userReducer,
    service: serviceReducer,
    reviews: reviewsReducer,
    profile: profileReducer,
    auth: authReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create custom hooks that use the store's dispatch and selector, with typing
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
