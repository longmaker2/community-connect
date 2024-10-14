import express from "express";
import userRoutes from "./src/routes/userRoutes.js";
import serviceRoutes from "./src/routes/serviceRoutes.js";
import conversationRoutes from "./src/routes/chats/conversationRoutes.js";
import messageRoutes from "./src/routes/chats/messagesRoutes.js";
import bookingRoutes from "./src/routes/bookingRoutes.js";
import connectDb from "./src/config/connectDb.js";
import dotenv from "dotenv";
import cors from "cors";
import reviewRoutes from "./src/routes/reviewRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
const port = process.env.PORT || 5000;
connectDb();

app.use("/api/user/auth", userRoutes);
app.use("/api/service", serviceRoutes);
app.use("/api/conversation", conversationRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/bookings", bookingRoutes);

app.listen(port, () => console.log(`Server started on port ${port}`));
