import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SettingsState {
  name: string;
  email: string;
  password: string;
  enable2FA: boolean;
  allowPublicProfile: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
}

const initialState: SettingsState = {
  name: "",
  email: "",
  password: "",
  enable2FA: false,
  allowPublicProfile: false,
  emailNotifications: false,
  smsNotifications: false,
  pushNotifications: false,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<Partial<SettingsState>>) => {
      const { name, email, password } = action.payload;
      if (name !== undefined) state.name = name;
      if (email !== undefined) state.email = email;
      if (password !== undefined) state.password = password;
    },
    toggleEnable2FA: (state) => {
      state.enable2FA = !state.enable2FA;
    },
    toggleAllowPublicProfile: (state) => {
      state.allowPublicProfile = !state.allowPublicProfile;
    },
    toggleEmailNotifications: (state) => {
      state.emailNotifications = !state.emailNotifications;
    },
    toggleSMSNotifications: (state) => {
      state.smsNotifications = !state.smsNotifications;
    },
    togglePushNotifications: (state) => {
      state.pushNotifications = !state.pushNotifications;
    },
  },
});

export const {
  setUserData,
  toggleEnable2FA,
  toggleAllowPublicProfile,
  toggleEmailNotifications,
  toggleSMSNotifications,
  togglePushNotifications,
} = settingsSlice.actions;

export default settingsSlice.reducer;
