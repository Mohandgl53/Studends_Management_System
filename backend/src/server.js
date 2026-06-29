import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import studentRoutes from "./routes/students.js";

const app = express();
app.use(express.json());
app.use(cors());
connectDB();

app.use("/api/data", studentRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server is Successfully Running at", PORT);
});