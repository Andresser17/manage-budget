require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
// Envs
const { DATABASE_URL } = process.env;

const sequelize = new Sequelize(DATABASE_URL, {
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const basename = path.basename(__filename);
const modelDefiners = [];

// read archives in Models folder, add to modelDefiner array
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// inject sequelize connection to all models
modelDefiners.forEach((model) => model(sequelize));
// capitalize models names: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// Associations
const { User, Operation, Category } = sequelize.models;

User.hasMany(Operation);
Operation.belongsTo(User);

Category.hasMany(Operation);
Operation.belongsTo(Category);

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
    // change to false before deploy
    await sequelize.sync({ force: false });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

const disconnect = async () => await sequelize.close();

module.exports = {
  ...sequelize.models,
  connect,
  disconnect,
};
