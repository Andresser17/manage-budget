const axios = require("axios");
// models
const { User } = require("../db");
// helpers
// const requiredFields = require("../helpers/requiredFields");
// const pagination = require("../helpers/pagination");
// const sortByWeight = require("../helpers/sortByWeight");
// const filterByTemp = require("../helpers/filterByTemp");

const signUpRouter = async (req, res) => {
  const { email, password } = req.body;

  try {
    // create a new user
    const user = await User.build({ email, password });

    // save new user
    await user.save();

    res.status(200).json(user);
  } catch (err) {
    console.log(err);

    if (err?.errors) {
      res.status(500).json({ message: err.errors[0].message });
      return;
    }

    res.status(500).json({ message: err.message });
  }
};

module.exports = signUpRouter;
