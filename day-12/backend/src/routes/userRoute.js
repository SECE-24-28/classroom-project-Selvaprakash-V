const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { verifyToken } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

// 🔓 Public Routes (No authentication required)
router.post("/register", userController.createUser);  // Register new user
router.post("/login", userController.loginUser);       // Login user
router.post("/", userController.createUser);           // Alternative register endpoint

// 🔐 Protected Routes (Authentication required)
router.get("/profile", verifyToken, userController.getProfile);  // Get logged-in user profile

// 🔐 Admin Only Routes (Authentication + Admin role required)
router.get("/", verifyToken, authorizeRoles("ADMIN"), userController.getAllUsers);
router.get("/:id", verifyToken, userController.getUserById);
router.put("/:id", verifyToken, userController.updateUser);
router.delete("/:id", verifyToken, authorizeRoles("ADMIN"), userController.deleteUser);

module.exports = router;
