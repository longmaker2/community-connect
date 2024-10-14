import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    businessName: { type: String, required: true },
    serviceTitle: { type: String, required: true },
    description: { type: String, required: true },
    pricing: { type: Number, required: true },
    availability: { type: String, required: true },
    location: { type: String, required: true },
    bio: { type: String, required: true },
    phone: { type: String, required: true },
    website: { type: String },
    socialLinks: { type: String },
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Service = mongoose.model("Service", serviceSchema);
export default Service;
