import User from "../../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Profile from "../../models/profile.js";

export const userRegistrationCtrl = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      userType,
      address,
    } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      userType,
      address,
    });

    // Create a profile automatically for the new user
    const profile = await Profile.create({
      userId: user._id,
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
    });

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      user: { id: user._id, email: user.email, userType: user.userType },
      profile,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const userLoginCtrl = async (req, res) => {
  try {
    const { email, password, userType } = req.body;
    const user = await User.findOne({
      $and: [{ email }, { userType }],
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      user: { id: user._id, email: user.email, userType: user.userType },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateUserCtrl = async (req, res) => {
  const { name, newPassword } = req.body;
  const userId = req.user.id;

  try {
    const updateData = {};

    if (name) {
      updateData.name = name;
    }

    if (newPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 12);
      updateData.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const getUserProfileCtrl = async (req, res) => {
  const userId = req.user.id;
  console.log("User ID:", req.user.id);

  try {
    // Select the correct fields based on your user model
    const user = await User.findById(userId).select(
      "firstName lastName username email"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user data in the response
    res.status(200).json({
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      username: user.username,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
