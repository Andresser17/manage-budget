const axios = require("axios");
// models
const { Operation } = require("../db");

const createOperationsRouter = async (req, res) => {
  const { concept, amount, date, type, category } = req.body;

  try {
    // get data from db
    const op = await Operation.build({
      concept,
      amount,
      date,
      type,
      category,
    });

    // save operation
    await op.save();

    res.status(201).json({ message: "Operation created successfuly" });
  } catch (err) {
    console.log(err);

    if (err?.errors) {
      res.status(500).json({ message: err.errors[0].message });
      return;
    }

    res.status(500).json({ message: err.message });
  }
};

module.exports = createOperationsRouter;
