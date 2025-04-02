// Yha important pre-imports
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
require("dotenv").config();

// Ye DB connection
const connectDB = require("./config/database");
connectDB();

// Ye Middlewares ka Section
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

// Ye Routes ka Section
const recruitmentRouter = require("./routes/recruitment.router");
app.use("/api",recruitmentRouter);

// Listening to the PORT
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
