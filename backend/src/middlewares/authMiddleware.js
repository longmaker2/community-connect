import User from "../models/user.js";
import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  let token;

  // Ensure Authorization header is present and begins with "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract the token from the Authorization header
      token = req.headers.authorization.split(" ")[1];

      // Verify the token and decode the user ID
      const decodedData = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by decoded ID
      const user = await User.findById(decodedData?.id).select("-password");

      // If no user is found, return a 404 error
      if (!user) {
        return res.status(404).json({ message: "User not found..." });
      }

      // Attach the user to the request object and continue to the next middleware
      req.user = user;
      next();
    } catch (error) {
      console.error("Error during token verification:", error);
      return res.status(401).json({ message: "Unauthorized, token failed" });
    }
  }

  // If no token is found in the Authorization header, return a 401 error
  if (!token) {
    return res.status(401).json({ message: "Unauthorized, token not found" });
  }
};

export default authMiddleware;
