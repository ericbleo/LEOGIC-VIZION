const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const detectionRoutes = require("./src/routes/detectionRoutes");

const PORT = 3001;

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Parse JSON request bodies
app.use(express.json());

app.use("/api/detection", detectionRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
