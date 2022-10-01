const bcrypt = require("bcrypt");
// models
const { User } = require("../db");

const signUpRouter = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  try {
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new user
    const user = await User.build({
      email,
      password: hashedPassword,
      balance: "0",
      currency: "USD",
    });

    // save new user
    await user.save();

    res.status(201).json({ message: "User created successfuly" });
  } catch (err) {
    console.log(err);

    if (err?.errors) {
      res.status(400).json({ message: err.errors[0].message });
      return;
    }

    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = signUpRouter;
