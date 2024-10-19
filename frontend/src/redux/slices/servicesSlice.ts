import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../utils/baseURL";

// Update the Service type with necessary fields, including 'category'
export type Service = {
  _id: string;
  businessName: string;
  description: string;
  price: number;
  image: string; // Image URL
  category: string; // Category of the service
  location: string; // Location of the service
  availability: string; // Availability info
  createdAt: string;
  updatedAt: string;
};

// New service data structure for creating a service
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

// Define the ServicesData type for storing services in the state
type ServicesData = {
  services: Service[] | Service; // Services can be an array or a single service
  loading: boolean;
  error: string | null;
};

// Fetch all services
export const getServices = createAsyncThunk<
  Service[],
  void,
  { rejectValue: string }
>("services/getServices", async (_, { rejectWithValue }) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axios.get(`${baseURL}/service/services`, config);
    return response.data; // Assuming the response contains an array of services
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(
        error.response.data.message || "Failed to fetch services"
      );
    }
    return rejectWithValue("Failed to fetch services");
  }
});

// Create a new service
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
        Authorization: `Bearer ${token}`, // Authenticate the request
      },
    };
    try {
      const response = await axios.post(
        `${baseURL}/service/services`,
        serviceData,
        config
      );
      return response.data; // Return the created service data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(
          error.response.data.message || "Failed to create service"
        );
      }
      return rejectWithValue("Failed to create service");
    }
  }
);

// Initial state for the services slice
const initialState: ServicesData = {
  services: [], // Array of services initially empty
  loading: false,
  error: null,
};

// Create the services slice
const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null; // Clear error when called
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
          state.services = action.payload; // Set the fetched services
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
          state.services = action.payload; // Set the newly created service
        }
      )
      .addCase(createService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create service";
      });
  },
});

export const { clearError } = servicesSlice.actions; // Export actions
export default servicesSlice.reducer; // Export reducer
