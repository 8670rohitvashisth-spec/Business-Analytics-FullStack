const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      message: "Access Denied",
    });
  }

  try {
    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = verified;
    next();
  } catch (err) {
    return res.status(403).json({
      message: "Invalid Token",
    });
  }
};
const express = require("express");
const router = express.Router();
const Business = require("../models/Business");
const jwt = require("jsonwebtoken");
const { query, validationResult } = require("express-validator");
router.get(
  "/",
  authenticateToken,
  [
    query("limit")
      .optional()
      .isInt({ min: 1, max: 1000 })
      .withMessage("Limit must be between 1 and 1000"),
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req);

if (!errors.isEmpty()) {
  return res.status(400).json({
    errors: errors.array(),
  });
}
    const businesses = await Business.find();
    res.json(businesses);
  } catch (error) {
    res.status(500).json({
  message: "Internal Server Error",
});
  }
}
);

module.exports = router;