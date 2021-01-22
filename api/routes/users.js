// Import required dependencies
const express = require("express");
const router = express.Router();

//Import controller file
const UsersController = require("../controllers/users");

// Import authentication middleware
const checkAuth = require("../../middlewares/check-auth");

// (POST) Create a new user in the database
router.post("/", UsersController.createUser);

// (POST) login user
router.post("/login", UsersController.loginUser);

// (GET) user details
router.get("/:userId", checkAuth, UsersController.getProfile);

// (UPDATE) profile
router.patch("/:userId", checkAuth, UsersController.updateProfile);

// (DELETE) user account
router.delete("/:userId", checkAuth, UsersController.deleteProfile);

module.exports = router;
