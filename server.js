require("dotenv").config(); //load environment variable for .env
const express = require("express"); // Import the express library to build our server
const connectDB = require("./config/db") 

const app = express(); // create an instance of express 
connectDB(); // connect to the database 

app.use(express.json()); // Middleware to parse JSON request bodies

app.use("/api/auth", require("./routes/auth")); // mount routes , (all related routes will start with the /api/auth)

app.get("/" , (req,res)=>{ // default routes to test server 
    res.send("your server is working dude!");
});

const PORT = process.env.PORT || 5000;
// start the server on port 5000 
app.listen(PORT , ()=>{
    console.log(`Your server is running on : http://localhost:${PORT}`);
});