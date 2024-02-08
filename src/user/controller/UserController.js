const express = require("express");
const router = express.Router();
const userService = require("../service/UserService");

// login user
router.post("/login", userService.login);

//signup user
router.post("/signup", userService.signup);

//signupGoogle user
router.post("/signupgoogle", userService.signupGoogle);

//signupGoogle user
router.post("/profile/update/:id", userService.updateProfile);


module.exports = router;
