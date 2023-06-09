const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const signUpModel = require("./Models/SignUpSchema.js");
const DeanSlot = require("./Models/DeanSlotSchema.js");
const BookSlot = require("./Models/BookSlotSchema.js");
const freeSlots = require("./controllers/GettingFreeSlots.js");
const slotBooking = require("./controllers/SlotBooking.js");
const createFreeSlots = require("./controllers/CreatingFreeSlots.js");
const SignUpFunction = require("./controllers/SignUpPage.js");
const loginFunction = require("./controllers/LoginPage.js");
require('dotenv').config();

// app.use(cors());
app.use(express.json());


const url = process.env.MONGO_URI;

const start = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(1337, console.log("listening to port 1337"));
  } catch (error) {
    console.log("error = ", error);
  }
};
start();

const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  const cleanedToken = token.replace("Bearer ", "");
  console.log(cleanedToken);
  try {
    const student = await signUpModel.findOne({ token:cleanedToken });
    console.log(student);
    if (!student) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.student = student;
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

app.post("/login", loginFunction);
app.post("/signup", SignUpFunction);
app.post("/dean/slots", authenticateToken, createFreeSlots);
app.post("/dean/book", authenticateToken, slotBooking);
app.get("/dean/pending-sessions", authenticateToken, freeSlots);

app.get("/dean/free-slots", authenticateToken, async (req, res) => {
  const allfreeSlots = await DeanSlot.find();
  res.json({ slots: allfreeSlots });
});

app.delete("/dean/pending-sessions", authenticateToken, async (req, res) => {
  const { date, studentName } = req.body;
  const deltedSlot = await BookSlot.findOneAndDelete({
    date,
    studentName,
  });
  res.json({ message: "Pending sessions cleared", document: deltedSlot });
});

app.delete("/delete-all", authenticateToken, async (req, res) => {
  const deleteall = await DeanSlot.deleteMany();
  res.json({ msg: deleteall });
});
