import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Review {
  rating: number;
  review: string;
}

interface ReviewState {
  reviews: Review[];
}

const initialState: ReviewState = {
  reviews: [],
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    addReview: (state, action: PayloadAction<Review>) => {
      state.reviews.push(action.payload);
    },
  },
});

export const { addReview } = reviewSlice.actions;
export default reviewSlice.reducer;
