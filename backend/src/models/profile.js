import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    services: { type: String, default: "None" },
    pricing: { type: String, default: "Negotiable" },
    availability: { type: String, default: "Not available" },
    location: { type: String, default: "Not specified" },
    bio: { type: String },
    profileImage: { type: String },
    portfolioImages: [{ type: String }],
    socialLinks: {
      facebook: { type: String, default: "" },
      instagram: { type: String, default: "" },
      linkedin: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
