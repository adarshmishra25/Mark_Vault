const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authMiddleware = require("./middleware/authMiddleware.js");

require("dotenv").config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const bookmarkRoutes = require("./routes/bookmark");
app.use("/api/bookmarks", bookmarkRoutes);

const passwordRoutes = require("./routes/password");
app.use("/api/passwords", passwordRoutes);

const dns = require("node:dns");

if (process.env.NODE_ENV !== "production") {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((error) => {
    console.log("Error Occurred:", error);
  });

app.get("/", (req, res) => {
  res.send("MarkVault API Running");
});

app.get("/api/protected", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Protected route accessed successfully",
    userId: req.userId,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server Running at port:", PORT);
});
