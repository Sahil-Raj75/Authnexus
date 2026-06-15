import express from "express";
const router = express.Router();
import *  as authController from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
// 1: Register route
// Users send their name, email, and password to this endpoint
router.post("/register", authController.register);

// 2: Login route
// Users send email and password to receive JWT
router.post("/login", authController.login);

// 3: Protected profile route
// Only accessible to authenticated users with a valid JWT
router.get("/profile", authMiddleware, authController.profile);

router.get("/refreshToken" , authController.refreshToken);

export default router;