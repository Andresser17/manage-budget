require("dotenv").config();
const app = require("./app.js");
const { connect } = require("./db.js");
// Envs
const { PORT } = process.env;

connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening at ${PORT}`);
  });
});
