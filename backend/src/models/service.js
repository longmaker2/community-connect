import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
    serviceType: { type: String, required: true }, // e.g., "Cleaning", "Repair", "Consultation"
    availability: {
      type: [String], // Array of available days, e.g., ['Monday', 'Tuesday']
      default: [],
    },
    location: {
      city: { type: String, required: true }, // e.g., "New York", "Nairobi"
      country: { type: String, required: true }, // e.g., "USA", "Kenya"
    },
    provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const Service = mongoose.model('Service', serviceSchema);
export default Service;
