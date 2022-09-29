const axios = require("axios");
// models
const { User } = require("../db");
// helpers
// const requiredFields = require("../helpers/requiredFields");
// const pagination = require("../helpers/pagination");
// const sortByWeight = require("../helpers/sortByWeight");
// const filterByTemp = require("../helpers/filterByTemp");

const signInRouter = async (req, res) => {
  const { email, password } = req.body;

  try {
    // get data from db
    const data = await User.findAll({ where: { email } });

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = signInRouter;
