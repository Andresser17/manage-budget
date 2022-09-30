const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// models
const { User } = require("../db");
// Envs
const {
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_LIMIT,
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_LIMIT,
} = process.env;

const signInRouter = async (req, res) => {
  const { email, password } = req.body;

  try {
    // get user from db
    const data = await User.findOne({ where: { email } });

    if (!data) {
      res.status(401).json({ message: "Email or password are invalid" });
      return;
    }

    // verify provided password with db password
    const isEqual = await bcrypt.compare(password, data.password);

    if (!isEqual) {
      res.status(401).json({ message: "Email or password are invalid" });
      return;
    }

    // create an access token
    const accessToken = jwt.sign(
      {
        email: data.email,
        userId: data.id,
      },
      ACCESS_TOKEN_SECRET,
      {
        expiresIn: ACCESS_TOKEN_LIMIT,
      }
    );

    // create a refresh token
    const refreshToken = jwt.sign(
      {
        email: data.email,
      },
      REFRESH_TOKEN_SECRET,
      { expiresIn: REFRESH_TOKEN_LIMIT }
    );

    // save refresh token in an http-only cookie
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ accessToken });
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = signInRouter;
