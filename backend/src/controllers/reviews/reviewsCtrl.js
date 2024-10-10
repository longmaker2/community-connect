import Review from "../../models/review.js";
import initials from "initials";
import { createCanvas } from "canvas";

export const getReviewsByService = async (req, res) => {
  const { serviceId } = req.params;

  try {
    const reviews = await Review.find({ serviceId });
    if (reviews.length === 0) {
      return res
        .status(404)
        .json({ message: "No reviews found for this service." });
    }
    return res.status(200).json(reviews);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createReview = async (req, res) => {
  const { name, profilePicture, review, rating, serviceId } = req.body;

  const userPicture = profilePicture || generateInitialsProfile(name);

  const newReview = new Review({
    name,
    profilePicture: userPicture,
    review,
    rating,
    serviceId,
  });

  try {
    const savedReview = await newReview.save();
    return res.status(201).json(savedReview);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const generateInitialsProfile = (name) => {
  const initialsText = initials(name);
  const canvas = createCanvas(40, 40);
  const context = canvas.getContext("2d");

  context.fillStyle = "#555";
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Text style
  context.font = "20px Arial";
  context.fillStyle = "#FFF";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(initialsText, canvas.width / 2, canvas.height / 2);

  return canvas.toDataURL();
};
