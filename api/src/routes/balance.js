// models
const { User } = require("../db");

const balanceRouter = async (req, res) => {
  const { userId } = req.decodedToken;

  try {
    // get user balance from db
    const data = await User.findOne({
      where: {
        id: userId,
      },
      attributes: ["balance", "currency"],
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

module.exports = balanceRouter;
