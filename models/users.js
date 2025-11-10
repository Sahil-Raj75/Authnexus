const mongoose = require("mongoose");

// Define a schema (blueprint of user data)
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Create and export the model
module.exports = mongoose.model("User", userSchema)

// Ye schema ko MongoDB me ek collection me convert karta hai.
// So ab Mongoose ek model bana deta hai jiska naam hai "User"

// as you can see that every user have the name , email and hashed password . this ensures that every user have this three fields.
