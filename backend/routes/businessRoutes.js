const express = require("express");
const router = express.Router();
const Business = require("../models/Business");

router.get("/", async (req, res) => {
  try {
    const businesses = await Business.find();
    res.json(businesses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;