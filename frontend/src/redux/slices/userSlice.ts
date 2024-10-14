import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../utils/baseURL";

type User = {
  id: string;
  email: string;
  userType: string;
};

type AuthData = {
  token: string;
  user: User;
};

type UserState = {
  auth: AuthData | null;
  loading: boolean;
  error: string | null;
};

type LoginCredentials = {
  email: string;
  password: string;
  userType: string;
};

type RegisterData = {
  username: string;
  email: string;
  password: string;
  userType: string;
  address: string;
  firstName: string;
  lastName: string;
};

// Update the return type of the async thunks
export const registerUser = createAsyncThunk<
  AuthData,
  RegisterData,
  { rejectValue: string }
>("user/register", async (user, { rejectWithValue }) => {
  try {
    const response = await axios.post<AuthData>(
      `${baseURL}/user/auth/register`,
      user,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    // Store user data and token in localStorage
    localStorage.setItem("token", response.data.token);
    if (response.data.user.userType === "customer") {
      localStorage.setItem("customerInfo", JSON.stringify(response.data));
    } else if (response.data.user.userType === "business") {
      localStorage.setItem("businessInfo", JSON.stringify(response.data));
    } else {
      localStorage.setItem("artisanInfo", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(
        error.response.data.message || "Registration failed"
      );
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

export const loginUser = createAsyncThunk<
  AuthData,
  LoginCredentials,
  { rejectValue: string }
>("user/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post<AuthData>(
      `${baseURL}/user/auth/login`,
      credentials,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    // Store user data and token in localStorage
    localStorage.setItem("token", response.data.token);
    if (response.data.user.userType === "consumer") {
      localStorage.setItem("consumerInfo", JSON.stringify(response.data));
    } else if (response.data.user.userType === "business") {
      localStorage.setItem("businessInfo", JSON.stringify(response.data));
    } else {
      localStorage.setItem("artisanInfo", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data.message || "Login failed");
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      // Remove all user info and token from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("customerInfo");
      localStorage.removeItem("businessInfo");
      localStorage.removeItem("artisanInfo");
    } catch (error) {
      return rejectWithValue("Logout failed");
    }
  }
);

// Initialize state
const tokenFromStorage = localStorage.getItem("token");
const userInfoFromStorage =
  localStorage.getItem("consumerInfo") ||
  localStorage.getItem("businessInfo") ||
  localStorage.getItem("artisanInfo");
const initialState: UserState = {
  auth: userInfoFromStorage ? JSON.parse(userInfoFromStorage) : null,
  loading: false,
  error: null,
};

// Create the slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<AuthData>) => {
          state.loading = false;
          state.auth = action.payload;
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<AuthData>) => {
          state.loading = false;
          state.auth = action.payload;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.auth = null;
      });
  },
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer;
