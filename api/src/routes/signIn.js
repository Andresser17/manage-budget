const jwt = require("jsonwebtoken");
// models
const { User } = require("../db");
// Envs
const { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET } = process.env;

const signInRouter = async (req, res) => {
  const { email, password } = req.body;

  try {
    // get user from db
    const data = await User.findOne({ where: { email } });

    if (!data) {
      res.status(401).json({ message: "Email or password are invalid" });
      return;
    }

    // hash user provided password

    // verify provided password with db password
    if (password !== data.password) {
      res.status(401).json({ message: "Email or password are invalid" });
      return;
    }

    // create an access token
    const accessToken = jwt.sign(
      {
        email: data.email,
      },
      ACCESS_TOKEN_SECRET,
      {
        expiresIn: "10m",
      }
    );

    // create an refresh token
    const refreshToken = jwt.sign(
      {
        email: data.email,
      },
      REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
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
