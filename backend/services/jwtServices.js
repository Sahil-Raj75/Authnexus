import config from "../config/config.js";
import jwt from "jsonwebtoken";
// generate a JWT
export const generateToken = (payload) => {
  // expiresIn defines how long the token is valid (here for 1 hour)
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn: "15m" });// jwt.sign creates a signed token using our secret key from environment variables
}

export const generateRefreshToken = (payload) => {
  // expiresIn defines how long the token is valid (here for 7 days)
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn: "7d" });// jwt.sign creates a signed token using our secret key from environment variables
}

// verify the JWT or secret key that server have 
export const verifyToken = (token) => {
  // jwt.verify checks if the token is valid and not expired
  return jwt.verify(token, config.JWT_SECRET);
};