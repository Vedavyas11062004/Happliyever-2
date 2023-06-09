const mongoose = require("mongoose");

const bookSlotSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  day: { type: String, required: true },
});

module.exports = mongoose.model("BookSlot", bookSlotSchema);
