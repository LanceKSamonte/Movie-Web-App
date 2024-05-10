import app from "./server.js";
import mongodb from "mongodb";
import ReviewsDAO from "./dao/reviewsDAO.js";

// Import MongoDB client
const MongoClient = mongodb.MongoClient;

// Get MongoDB connection string and credentials from environment variables
const mongo_username = process.env.MONGO_USERNAME;
const mongo_password = process.env.MONGO_PASSWORD;

// Construct MongoDB connection URI with credentials
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.otmeedx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const port = 8000;

// Connect to MongoDB server
MongoClient.connect(
    uri,
    {
        maxPoolSize: 50, 
        wtimeoutMS: 2500, 
    }
)
.catch(err => {
    console.error(err.stack);
    process.exit(1);
})
.then(async client => {
    // Inject the MongoDB client into the ReviewsDAO
    await ReviewsDAO.injectDB(client);
    // Start the server and listen for incoming requests
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
});
