const express = require("express");
const mongoose = require("mongoose");
const dns = require("node:dns");
const app = express();
const PostRoutes = require("./Routes/posts");
const cors = require("cors");
require("dotenv").config();
app.use(cors());
const upload = require("./middleware/upload");
const CategoryRoutes = require("./Routes/category");
const RegisterRoute = require("./Routes/Register");
const LoginRoutes = require("./Routes/Login");
const UserRoutes = require("./Routes/users");
const PORT = process.env.PORT || 3000;
const authenticationmiddleare = require("./authmiddleware");
app.use(express.json());
console.log("MONGO_URI exists:", !!process.env.MONGO_URI);
const mongoDnsServers = (process.env.MONGO_DNS_SERVERS || "1.1.1.1,8.8.8.8")
  .split(",")
  .map((server) => server.trim())
  .filter(Boolean);

async function connectDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
  } catch (error) {
    if (
      !process.env.MONGO_URI?.startsWith("mongodb+srv://") ||
      error.code !== "ECONNREFUSED"
    ) {
      throw error;
    }
    dns.setServers(mongoDnsServers);
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });
  }
}

app.use(express.json());
app.use(
  "/api/posts",
  authenticationmiddleare,
  upload.single("image"),
  PostRoutes,
);
app.use("/api/category", authenticationmiddleare, CategoryRoutes);
app.use("/api/Register", RegisterRoute);
app.use("/api/Login", LoginRoutes);
app.use("/api/users", authenticationmiddleare, UserRoutes);

connectDatabase()
  .then(() => {
    console.log("database connected");
    app.listen(PORT, () => {
      console.log("server running on PORT", PORT);
    });
  })
  .catch((error) => {
    console.error(
      "Database connection failed; API was not started:",
      error.message,
    );
    process.exit(1);
  });
