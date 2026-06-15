 //load environment variable for .envconst express = require("express"); // Import the express library to build our server
import config from "./config/config.js"; // Import configuration settings from config.js
import connectDB from "./config/db.js"; // Import the database connection function
import express from "express"; // Import the express library to build our server
import authRoutes from "./routes/auth.js"; // Import authentication routes
import cookieParser from "cookie-parser"; // Import cookie-parser middleware to handle cookies


const app = express(); // create an instance of express 
connectDB(); // connect to the database 

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cookieParser()); // Middleware to parse cookies from incoming requests

// Enable CORS for the frontend dev server
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Headers', 'Authorization,Origin,X-Requested-With,Content-Type,Accept');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

app.use("/api/auth", authRoutes); // mount routes , (all related routes will start with the /api/auth)

app.get("/" , (req,res)=>{ // default routes to test server 
    res.send("your server is working dude!");
});

const PORT = config.PORT;
// start the server on port 5000 
app.listen(PORT , ()=>{
    console.log(`Your server is running on : http://localhost:${PORT}`);
});