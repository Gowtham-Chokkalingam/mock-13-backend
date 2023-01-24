const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");
const JWT_SECRET = "1234";

const userSignup = async (req, res) => {
  const { email, password, name } = req.body;
  console.log('req.body:', req.body)
  const checkAdmin = email.split("@");
  let role = "";
  if (checkAdmin[1] === "masaischool.com") {
    role = "admin";
  } else {
    role = "user";
  }

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const userExist = await User.findOne({ email: req.body.email });

    if (userExist) {
      return res.status(401).json({ message: `Username ${req.body.email} alredy exist` });
    }

    const newUser = await User.create({
      name,
      email,
      password: encryptedPassword,
      role,
    });

    res.status(201).json({ message: newUser, status: "New User has been created" });
  } catch (error) {
    console.log("Error at backend SignupAPI Route", error.message);
    res.status(500).json({ message: error.message });
  }
};

const userSigin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  console.log('user:', user)
  if (!user) {
    return res.json({ error: true, message: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET);

    return res.json({ token: token, email, role:user.role, timeStamp: new Date().toLocaleString() });
  } else {
    return res.json({ error: true, message: "Invalid Password" });
  }
};


module.exports = { userSignup, userSigin };
