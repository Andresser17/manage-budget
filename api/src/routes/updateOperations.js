const axios = require("axios");
// models
const { Operation, Category } = require("../db");

const updateOperationsRouter = async (req, res) => {
  const { concept, amount, date, type, category } = req.body;
  const { id } = req.params;
  const { userId } = req.decodedToken;

  try {
    // get op from db
    const op = await Operation.findOne({
      where: { id },
    });

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

    res.status(201).json({ message: "Operation updated successfuly" });
  } catch (err) {
    console.log(err);

    if (err?.errors) {
      res.status(500).json({ message: err.errors[0].message });
      return;
    }

    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = updateOperationsRouter;
