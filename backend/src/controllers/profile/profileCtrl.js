import Profile from "../../models/profile.js";

// Create or update profile
export const createOrUpdateProfile = async (req, res) => {
  const {
    services,
    pricing,
    availability,
    location,
    bio,
    profileImage,
    portfolioImages,
    socialLinks,
  } = req.body;

  try {
    console.log("Received profile data:", {
      services,
      pricing,
      availability,
      location,
      bio,
      profileImage,
      portfolioImages,
      socialLinks,
    });

    let profile = await Profile.findOne({ userId: req.user.id });

    if (profile) {
      // Update existing profile
      profile.services = services;
      profile.pricing = pricing;
      profile.availability = availability;
      profile.location = location;
      profile.bio = bio;
      profile.profileImage = profileImage;
      profile.portfolioImages = portfolioImages;
      profile.socialLinks = socialLinks;
    } else {
      // Create new profile
      profile = new Profile({
        userId: req.user.id,
        services,
        pricing,
        availability,
        location,
        bio,
        profileImage,
        portfolioImages,
        socialLinks,
      });
    }

    await profile.save();
    console.log("Profile saved successfully:", profile);
    res.status(200).json(profile);
  } catch (error) {
    console.error("Failed to save profile:", error);
    res.status(500).json({ message: "Failed to save profile", error });
  }
};

// Get user profile
export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.params.userId });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve profile", error });
  }
};
