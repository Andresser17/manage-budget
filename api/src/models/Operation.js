const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Operation", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    concept: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [3, 250],
      },
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // only accept income or outcome like valid
        isAValidOption(value) {
          const valueLower = value.toLowerCase();
          if (value !== "income" && value !== "outcome") {
            throw new Error("Only income or outcome are accepted values");
          }
        },
      },
    },
  });
};
