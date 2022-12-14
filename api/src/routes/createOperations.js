// models
const { Operation, Category } = require("../db");
// helpers
const updateUserBalance = require("../helpers/updateUserBalance");

const createOperationsRouter = async (req, res) => {
  const { concept, amount, date, type, category } = req.body;
  const { userId } = req.decodedToken;

  try {
    // build and save new op
    const op = await Operation.create({
      concept,
      amount,
      date,
      type,
    });

    // associate to user
    await op.setUser(userId);

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

    res.status(201).json({ message: "Operation created successfuly" });
  } catch (err) {
    console.log(err);

    if (err?.errors) {
      res.status(400).json({ message: err.errors[0].message });
      return;
    }

    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = createOperationsRouter;
