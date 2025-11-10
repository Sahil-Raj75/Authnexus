const bcrypt = require("bcryptjs");

// this part basically hash the plain password!
exports.hashPassword = async (plainPassword) => {

  // The number 10 is the salt rounds, which affects the hashing complexity (hard to crack for hacker)
  return await bcrypt.hash(plainPassword, 10); 
  // bcrypt.hash generates a hashed form of the password
};  

// Function to compare a plain password with a hashed password
exports.comparePassword = async (plainPassword, hashedPassword) => {
  // bcrypt.compare checks if the plain password matches the hashed one
  return await bcrypt.compare(plainPassword, hashedPassword);
};