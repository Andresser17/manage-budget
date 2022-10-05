// models
const { Operation } = require("../db");

const operationsRouter = async (req, res) => {
  const query = req.query;
  const { userId } = req.decodedToken;

  try {
    // get user operations from db
    const count = await Operation.count({ where: { UserId: userId } });
    const data = await Operation.findAll({
      where: {
        UserId: userId,
        ...(query.type && { type: query.type }),
        ...(query.category && { CategoryId: query.category }),
      },
      ...(query.limit && { limit: query.limit }),
      ...(query.page && { offset: query.page * query.limit }),
      order: [["id", query.sort ? query.sort.toUpperCase() : "ASC"]],
      include: ["Category"],
    });

    res.status(200).json({ count, data });
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
