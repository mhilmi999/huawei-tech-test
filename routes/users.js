const express = require("express");
const router = express.Router();
const usersController = require('../controllers/users');

// Simple API route for get and store data
router.get("/register", usersController.getUsers);
router.post("/register", usersController.saveUsers);

module.exports = router;