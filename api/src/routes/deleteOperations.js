// models
const { Operation } = require("../db");

const deleteOperationsRouter = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.decodedToken;

  try {
    // get op from db
    const op = await Operation.findOne({
      where: { id, userId },
    });

    if (!op) {
      res.status(404).json({ message: "Operation not found" });
      return;
    }

    await op.destroy();

    res.status(200).json({ message: "Operation deleted successfuly" });
  } catch (err) {
    console.log(err);

    if (err?.errors) {
      res.status(400).json({ message: err.errors[0].message });
      return;
    }

    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = deleteOperationsRouter;
