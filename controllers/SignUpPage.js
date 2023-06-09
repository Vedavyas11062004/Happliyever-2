const signUpModel=require('../Models/SignUpSchema.js')
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const SignUpFunction = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingStudent = await signUpModel.findOne({ email });

    if (existingStudent) {
      return res.status(409).json({ message: "Student already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = new signUpModel({
      email,
      password: hashedPassword,
    });

    await student.save();

    res.json({ message: "Student registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports=SignUpFunction
