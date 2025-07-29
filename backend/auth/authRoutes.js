const express = require("express");
const router = express.Router();
const { registerUser, loginUser, protectRoute } = require("./authController");

router.post("/register", registerUser);
router.post("/login", loginUser);

// Example protected route
router.get("/dashboard", protectRoute, (req, res) => {
  res.json({ message: "Welcome to the protected dashboard", user: req.user });
});

module.exports = router;
