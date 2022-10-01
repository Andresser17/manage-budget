// models
const { Operation, Category } = require("../db");
// helpers
const updateUserBalance = require("../helpers/updateUserBalance");

const updateOperationsRouter = async (req, res) => {
  const { concept, amount, date, type, category } = req.body;
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

    // update operation
    op.set({ concept, amount, date, type });
    await op.save();

    // get category from db, if not exist create it
    if (category) {
      let categoryToAssociate = await Category.findOne({
        where: { name: category },
      });

      if (!categoryToAssociate) {
        categoryToAssociate = await Category.create({ name: category });
      }

      await op.setCategory(categoryToAssociate.id);
    }

    // update user balance
    await updateUserBalance(userId, type, amount);

    res.status(200).json({ message: "Operation updated successfuly" });
  } catch (err) {
    console.log(err);

    if (err?.errors) {
      res.status(400).json({ message: err.errors[0].message });
      return;
    }

    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = updateOperationsRouter;
