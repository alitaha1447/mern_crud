const User = require("../modals/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  signUp: async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const existingUserByEmail = await User.findOne({ email: email });
      if (existingUserByEmail) {
        return res.status(400).json({ message: "User already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id, email: newUser.email },
        process.env.JWT_SECRET
      );
      newUser.token = token;
      await newUser.save();
      return res.send("Saved Data");
    } catch (error) {
      return res.send(error);
    }
  },
  logIn: async (req, res) => {
    try {
      const { email, password } = req.body;
      let user = await User.findOne({ email: email });
      if (!user) {
        return res.status(400).json({ message: "EMAIL_NOT_FOUND" });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(400).json({ message: "PASSWORD_INVALID" });
      }
      res.status(201).json({
        message: "LogIn Successfully !!!",
        user,
      });
    } catch (error) {
      return res.send(error);
    }
  },
};
