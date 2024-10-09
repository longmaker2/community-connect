import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  profileImage: File | null;
  portfolioImages: File[];
  socialLinks: SocialLinks;
}

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
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfile: (
      state,
      action: PayloadAction<{
        services: string;
        pricing: string;
        availability: string;
        location: string;
        bio: string;
        profileImage: File | null;
        portfolioImages: File[];
        socialLinks: SocialLinks;
      }>
    ) => {
      state.services = action.payload.services;
      state.pricing = action.payload.pricing;
      state.availability = action.payload.availability;
      state.location = action.payload.location;
      state.bio = action.payload.bio;
      state.profileImage = action.payload.profileImage;
      state.portfolioImages = action.payload.portfolioImages;
      state.socialLinks = action.payload.socialLinks;
    },
  },
});

export const { updateProfile } = profileSlice.actions;
export default profileSlice.reducer;
