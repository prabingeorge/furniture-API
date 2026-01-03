import express, { json } from "express";
import { config } from "dotenv";
import cors from "cors";
// import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
// import adminRoutes from "./routes/admin.js";
// import protectedRoutes from "./routes/protected.js";
// import postRoutes from "./routes/posts.js";
import categoriesRoutes from "./routes/categories.js";

// Load environment variables
config();
// connectDB();

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", categoriesRoutes);
// app.use("/api/admin", adminRoutes);

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
