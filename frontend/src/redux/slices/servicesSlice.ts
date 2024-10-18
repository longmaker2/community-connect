import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../utils/baseURL";

export type Service = {
  _id: string;
  businessName: string;
  description: string;
  price: number;
  image: string;
  category: string;
  createdAt: string;
  updatedAt: string;
};
type ServicesData = {
  services: Service[] | Service;
  loading: boolean;
  error: string | null;
};

export interface newService {
  businessName: string;
  serviceTitle: string;
  description: string;
  pricing: string;
  availability: string;
  location: string;
  bio: string;
  phone: string;
  website: string;
  socialLinks: string;
}
export const getServices = createAsyncThunk<
  Service[],
  void,
  { rejectValue: string }
>("services/getServices", async (_, { rejectWithValue, getState }) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axios.get(`${baseURL}/service/services`, config);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(
        error.response.data.message || "Failed to fetch services"
      );
    }
    return rejectWithValue("Failed to fetch services");
  }
});
export const createService = createAsyncThunk<
  Service,
  newService,
  { rejectValue: string }
>(
  "services/createService",
  async (serviceData: newService, { rejectWithValue, getState }) => {
    const state = getState() as { user: { auth: { token: string } } };
    const {
      user: {
        auth: { token },
      },
    } = state;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.post(
        `${baseURL}/service/services`,
        serviceData,
        config
      );

      return response.data;
    } catch (error) {
      console.log("error", error);
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(
          error.response.data.message || "Failed to fetch services"
        );
      }
      return rejectWithValue("Failed to fetch services");
    }
  }
);

const initialState: ServicesData = {
  services: [],
  loading: false,
  error: null,
};
const userSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getServices.fulfilled,
        (state, action: PayloadAction<Service[]>) => {
          state.loading = false;
          state.services = action.payload;
        }
      )
      .addCase(getServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch services";
      })
      .addCase(createService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createService.fulfilled,
        (state, action: PayloadAction<Service>) => {
          state.loading = false;
          state.services = action.payload;
        }
      )
      .addCase(createService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch services";
      });
  },
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer;
