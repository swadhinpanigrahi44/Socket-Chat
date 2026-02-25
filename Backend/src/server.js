import express from "express";
import dotenv from "dotenv";
import path from "path";

import authRoute from "./routes/auth_route.js";
import messageRoute from "./routes/message_route.js";

dotenv.config();

const app = express();
const __dirname = path.resolve();

const PORT = process.env.PORT || 3000;

// API endpoints
app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);

// make ready for deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
