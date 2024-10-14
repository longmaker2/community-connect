import Review from "../../models/review.js";

export const getReviewsByService = async (req, res) => {
  const { serviceId } = req.params;

  try {
    const reviews = await Review.find({ service: serviceId }).populate(
      "service",
      "name description"
    );
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error });
  }
};

export const createReview = async (req, res) => {
  const { name, profilePicture, review, rating, serviceId } = req.body;

  if (!serviceId) {
    return res.status(400).json({ message: "Service ID is required" });
  }

  try {
    const newReview = await Review.create({
      name,
      profilePicture,
      review,
      rating,
      service: serviceId,
    });

    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: "Error creating review", error });
  }
};
