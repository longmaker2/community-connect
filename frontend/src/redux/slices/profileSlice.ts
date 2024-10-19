import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store/store";
import { baseURL } from "../../utils/baseURL";

// Types for social links and profile state
interface SocialLinks {
  facebook: string;
  instagram: string;
  linkedin: string;
}

interface ProfileState {
  services: string;
  pricing: string;
  availability: string;
  location: string;
  bio: string;
  profileImage: string | null;
  portfolioImages: string[];
  socialLinks: SocialLinks;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ProfileState = {
  services: "",
  pricing: "",
  availability: "",
  location: "",
  bio: "",
  profileImage: null,
  portfolioImages: [],
  socialLinks: {
    facebook: "",
    instagram: "",
    linkedin: "",
  },
  loading: false,
  error: null,
};

// Fetch profile action
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (userId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${baseURL}/profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile"
      );
    }
  }
);

// Update profile action
export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${baseURL}/profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update profile"
      );
    }
  }
);

// Profile slice
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProfile.fulfilled,
        (state, action: PayloadAction<ProfileState>) => {
          state.loading = false;
          Object.assign(state, action.payload);
        }
      )
      .addCase(fetchProfile.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        updateProfile.fulfilled,
        (state, action: PayloadAction<ProfileState>) => {
          state.loading = false;
          Object.assign(state, action.payload);
        }
      )
      .addCase(updateProfile.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectProfile = (state: RootState) => state.profile;
export default profileSlice.reducer;
