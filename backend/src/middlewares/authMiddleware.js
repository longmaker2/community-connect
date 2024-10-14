import User from "../models/user.js";
import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req?.headers?.authorization?.split(" ")[1];
    if (token) {
      const decodedData = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decodedData?.id);
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).json({ message: "User not found..." });
      }
    } else {
      res.status(401).json({ message: "Unauthorized Token not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
export default authMiddleware;
