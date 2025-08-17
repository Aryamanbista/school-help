const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Initialize Express app
const app = express();

// Middleware
// Enable Cross-Origin Resource Sharing
app.use(cors());
// Enable Express to parse JSON bodies
app.use(express.json());

// --- API Routes ---
// Import route files
const authRoutes = require("./routes/authRoutes");
const requestRoutes = require("./routes/requestRoutes");
const offerRoutes = require("./routes/offerRoutes");

// Use the routes
app.use("/api/auth", authRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/offers", offerRoutes);

// Define a simple root route for testing
app.get("/", (req, res) => {
  res.send("SchoolHelp API is running...");
});

// Get port from environment variables or use 5000 as a default
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
