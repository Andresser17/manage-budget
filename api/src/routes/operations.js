const axios = require("axios");
// models
const { Operation } = require("../db");

const operationsRouter = async (req, res) => {
  try {
    // get data from db
    const data = await Operation.findAll();

    res.status(200).json(data);
  } catch (err) {
    console.log(err);

    if (err?.errors) {
      res.status(500).json({ message: err.errors[0].message });
      return;
    }

    res.status(500).json({ message: err.message });
  }
};

module.exports = operationsRouter;
