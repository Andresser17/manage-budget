// models
const { User } = require("../db");

const operationsRouter = async (req, res) => {
  const { email } = req.decodedToken;

  try {
    // get user operations from db
    const data = await User.findOne({
      attributes: [],
      where: { email },
      include: ["operations"],
    });

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
