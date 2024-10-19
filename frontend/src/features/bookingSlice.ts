import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BookingState {
  date: Date | null;
  timeSlot: string | null;
  serviceId: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: BookingState = {
  date: null,
  timeSlot: null,
  serviceId: null,
  loading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookingDate: (state, action: PayloadAction<Date | null>) => {
      state.date = action.payload;
    },
    setTimeSlot: (state, action: PayloadAction<string>) => {
      state.timeSlot = action.payload;
    },
    setServiceId: (state, action: PayloadAction<string | null>) => {
      state.serviceId = action.payload;
    },
    addBooking: (state, action: PayloadAction<any>) => {
      // Handle newly added booking if needed
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearBooking: (state) => {
      state.date = null;
      state.timeSlot = null;
      state.serviceId = null;
      state.error = null;
    },
  },
});

export const {
  setBookingDate,
  setTimeSlot,
  setServiceId,
  addBooking,
  setLoading,
  setError,
  clearBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;
