import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BookingState {
  date: Date | null;
}

const initialState: BookingState = {
  date: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookingDate: (state, action: PayloadAction<Date>) => {
      state.date = action.payload;
    },
  },
});

export const { setBookingDate } = bookingSlice.actions;
export default bookingSlice.reducer;
