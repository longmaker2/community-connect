import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  email: string;
  token: string;
  userType: string;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  email: "",
  token: "",
  userType: "",
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ email: string; token: string; userType: string }>
    ) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.userType = action.payload.userType;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.email = "";
      state.token = "";
      state.userType = "";
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
