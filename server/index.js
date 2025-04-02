// Yha important pre-imports
import express from "express"
import cors from "cors"
import morgan from "morgan";
const app = express();
import dotenv from "dotenv"; dotenv.config();
import path from "path";

// Ye DB connection
import connectDB from "./config/database.js";

const __dirname = path.resolve();

// Ye Middlewares ka Section
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));

// Ye Routes ka Section
import recruitmentRouter from "./routes/recruitment.router.js";
app.use("/api",recruitmentRouter);

import job from "./service/cronJob.js";

console.log(__dirname)
app.use(express.static(path.join(__dirname, "client", "dist")));


app.get(/^(?!\/api\/).+/, (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Listening to the PORT
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    connectDB();
    job.start();
    console.log(`Server is running on port ${PORT}`);
});
