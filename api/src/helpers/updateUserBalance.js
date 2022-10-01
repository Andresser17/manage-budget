// models
const { User } = require("../db");

const updateUserBalance = async (userId, type, amount) => {
  const user = await User.findOne({ where: { id: userId } });

  if (type === "income") {
    user.balance = Number(user.balance) + Number(amount);
    user.save();
  }

  if (type === "outcome") {
    user.balance = Number(user.balance) - Number(amount);
    user.save();
  }
};

module.exports = updateUserBalance;
