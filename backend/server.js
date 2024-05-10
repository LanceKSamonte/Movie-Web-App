import express from "express"
import cors from "cors"
import reviews from "./api/reviews.route.js"

const app = express(); // Create an Express application

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Define routes
app.use("/api/v1/reviews", reviews); // Use the reviews route handler for "/api/v1/reviews" endpoint

// Middleware to handle 404 errors
app.use("*", (req, res) => res.status(404).json({error: "not found"}));

export default app; // Export the Express application