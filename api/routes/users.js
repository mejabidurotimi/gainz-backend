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

// (DELETE) user account
router.delete("/:userId", checkAuth, UsersController.deleteAccount);

module.exports = router;
