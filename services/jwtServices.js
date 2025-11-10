const jwt = require("jsonwebtoken");

// generate a JWT
exports.generateToken = (payload) => {

  // expiresIn defines how long the token is valid (here for 1 hour)
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });// jwt.sign creates a signed token using our secret key from environment variables
};

// verify the JWT or secret key that server have 
exports.verifyToken = (token) => {
  // jwt.verify checks if the token is valid and not expired
  return jwt.verify(token, process.env.JWT_SECRET);
};