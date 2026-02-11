const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const { notFound, errorHandler } = require("./middleware/errormiddleware");

dotenv.config();
connectDB();

const app = express();

// middlewares
app.use(morgan("dev"));
app.use(express.json());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);



// routes
app.get("/", (req, res) => {
  res.send("Blog API running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

