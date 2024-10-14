import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../utils/baseURL";

export type Review = {
  _id: string;
  name: string;
  profilePicture: string;
  review: string;
  rating: number;
  createdAt: string;
};

type ReviewsData = {
  reviews: Review[];
  loading: boolean;
  error: string | null;
};

export const getReviews = createAsyncThunk<
  Review[],
  string,
  { rejectValue: string }
>("reviews/getReviews", async (serviceId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${baseURL}/reviews/${serviceId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data.message || "Failed to fetch reviews");
    }
    return rejectWithValue("Failed to fetch reviews");
  }
});

export const addReview = createAsyncThunk<
  Review,
  { serviceId: string; name: string; profilePicture: string; review: string; rating: number },
  { rejectValue: string }
>("reviews/addReview", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${baseURL}/reviews`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data.message || "Failed to add review");
    }
    return rejectWithValue("Failed to add review");
  }
});

const initialState: ReviewsData = {
  reviews: [],
  loading: false,
  error: null,
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReviews.fulfilled, (state, action: PayloadAction<Review[]>) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch reviews";
      })
      .addCase(addReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addReview.fulfilled, (state, action: PayloadAction<Review>) => {
        state.loading = false;
        state.reviews.push(action.payload);
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add review";
      });
  },
});

export const { clearError } = reviewsSlice.actions;
export default reviewsSlice.reducer;
