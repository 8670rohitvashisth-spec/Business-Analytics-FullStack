const mongoose = require("mongoose");

const BusinessSchema = new mongoose.Schema(
  {},
  {
    strict: false
  }
);

module.exports = mongoose.model("Business", BusinessSchema);