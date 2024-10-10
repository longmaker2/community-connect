// import express from "express";
// import userRoutes from "./src/routes/userRoutes.js";
// import serviceRoutes from "./src/routes/serviceRoutes.js";
// import reviewRoutes from "./src/routes/reviewRoutes.js";
// import connectDb from "./src/config/connectDb.js";
// import dotenv from "dotenv";
// dotenv.config();
// const app = express();
// app.use(express.json());
// const port = 3000;
// connectDb();

// app.use("/api/user/auth", userRoutes);
// app.use("/api/service", serviceRoutes);
// app.use("/api/reviews", reviewRoutes);
// app.listen(port, () => console.log(`Server started on port ${port}`));

import express from "express";
import userRoutes from "./src/routes/userRoutes.js";
import serviceRoutes from "./src/routes/serviceRoutes.js";
import reviewRoutes from "./src/routes/reviewRoutes.js";
import connectDb from "./src/config/connectDb.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

connectDb();

app.use("/api/user/auth", userRoutes);
app.use("/api/service", serviceRoutes);
app.use("/api/reviews", reviewRoutes);

app.listen(port, () => console.log(`Server started on port ${port}`));
