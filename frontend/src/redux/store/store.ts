import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import serviceReducer from "../slices/servicesSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import reviewsReducer from "../slices/reviewsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    service: serviceReducer,
    reviews: reviewsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
