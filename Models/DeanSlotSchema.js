const mongoose = require("mongoose");

const deanSlotSchema = new mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  day: { type: String, required: true },
});

module.exports = mongoose.model("DeanSlot", deanSlotSchema);
