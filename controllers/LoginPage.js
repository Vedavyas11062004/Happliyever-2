const signUpModel = require("../Models/SignUpSchema.js");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const generateToken = () => {
  return require("uuid").v4();
};

const loginFunction = async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await signUpModel.findOne({ email });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    const passwordMatch = await bcrypt.compare(password, student.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken();
    const saveToken = await signUpModel.findOneAndUpdate(
      { email },
      { token, email: student.email, password: student.password },
      { new: true }
    );
    
    res.json({ token, student });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = loginFunction;
