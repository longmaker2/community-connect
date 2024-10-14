import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BookingState {
  date: Date | null;
  serviceProvider: string | null;
  serviceType: string | null;
  timeSlot: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: BookingState = {
  date: null,
  serviceProvider: null,
  serviceType: null,
  timeSlot: null,
  loading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setBookingDate: (state, action: PayloadAction<Date | null>) => {
      state.date = action.payload;
    },
    setServiceProvider: (state, action: PayloadAction<string>) => {
      state.serviceProvider = action.payload;
    },
    setServiceType: (state, action: PayloadAction<string>) => {
      state.serviceType = action.payload;
    },
    setTimeSlot: (state, action: PayloadAction<string>) => {
      state.timeSlot = action.payload;
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
      state.serviceProvider = null;
      state.serviceType = null;
      state.timeSlot = null;
      state.error = null;
    },
  },
});

export const {
  setBookingDate,
  setServiceProvider,
  setServiceType,
  setTimeSlot,
  addBooking,
  setLoading,
  setError,
  clearBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;
