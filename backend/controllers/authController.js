import { config } from "dotenv";
import userModel from "../models/users.js";

import { hashPassword, comparePassword } from "../services/hashServices.js";
import { verifyToken , generateToken, generateRefreshToken } from "../services/jwtServices.js";

export const register = async (req, res) => { // handles user registration 
  try {
    const { name, email, password } = req.body; // Get user input

    // 1: Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "user already exists!" });

    // 2: Hash password using hashService
    const hashedPassword = await hashPassword(password);

    // 3: Save the new user to database
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    })

    const accessToken = generateToken({ id: user._id}); // Generate JWT for the new user
    // 4: return the success message
    
    const refreshToken = generateRefreshToken({ id: user._id}); // Generate refresh token for the new user
    
    console.log("refreshToken: ",refreshToken);

    res.cookie("refreshToken", refreshToken, { // Set refresh token in HTTP-only cookie
      httpOnly: true, // client side se jo js run hone wali hai wo is cookies ke data ko read nhi kr paye gi
      secure: false, // Use secure cookies in production
      sameSite: "lax", // Prevent CSRF
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });    
    

    res.status(201).json({ 
      message: "userModel registered successfully!" ,
      user :{
        name : user.name,
        email : user.email,
      } 
     });
  }
   catch (err) {
    // Handle errors gracefully
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => { // handles the user login
  try {
    const { email, password } = req.body; // Get user input

    // 1: Find user by email
    const user = await userModel.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    // 2: Compare provided password with hashed password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    // 3: Generate JWT using jwtService
    const accessToken = generateToken({
      id: user._id,
    });

    const refreshToken = generateRefreshToken({ id: user._id });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // 4: Send success response with accessToken
    res.json({
      message: 'Login successful!',
      user: {
        name: user.name,
        email: user.email,
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const refreshToken = async (req, res) => {
  try {

    const token = req.cookies.refreshToken;

   if (!token) {
      return res.status(401).json({
         message: "No refresh token found"
      });
   }

    const decoded = verifyToken(token);

    const accessToken = generateToken({
      id: decoded.id,
    });

    const newRefreshToken = generateRefreshToken({
      id: decoded.id,
    });

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      accessToken,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};
// Protected profile route
export const profile = (req, res) => { // show the profile after login  // req.user is set by auth middleware after accessToken verification
  res.json({
    message: "Welcome This is Admin page!",
    user: req.user,
  });
};