// models
const { Operation } = require("../db");
// helpers
const updateUserBalance = require("../helpers/updateUserBalance");

const deleteOperationsRouter = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.decodedToken;

  try {
    // get op from db
    const op = await Operation.findOne({
      where: { id, UserId: userId },
    });

    if (!op) {
      res.status(404).json({ message: "Operation not found" });
      return;
    }

    // undo previous operation balance
    await updateUserBalance(
      userId,
      op.type === "outcome" ? "income" : "outcome",
      op.amount
    );

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
