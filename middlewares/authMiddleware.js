const { verifyToken } = require("../services/jwtServices");

// Middleware to protect routes
module.exports = (req, res, next) => {
  // 1: Get Authorization header
  const authHeader = req.headers["authorization"]; // check the authorisation header is present or not 
  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  // 2: Extract token from format 'Bearer <token>'
  const token = authHeader.split(" ")[1]; // 
  if (!token) return res.status(401).json({ message: "Malformed token" });

  try {
    // 3: Verify token using jwtService
    const decoded = verifyToken(token); 

    // 4: Attach decoded user info to request.user 
    req.user = decoded;

    // Proceed to next middleware or route handler
    next();
  } catch (err) {
    // If token is invalid or expired
    res.status(401).json({ message: "Invalid or expired token" });
  }
};