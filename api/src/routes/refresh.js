const jwt = require("jsonwebtoken");
// Envs
const { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET } = process.env;

const refreshRouter = async (req, res) => {
  // Destructuring refreshToken from cookie
  const { jwt: refreshToken } = req.cookies;

  try {
    // get email from token
    const decoded = await jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);

    // Correct token we send a new access token
    const accessToken = jwt.sign(
      {
        email: decoded.email,
      },
      ACCESS_TOKEN_SECRET,
      {
        expiresIn: "10m",
      }
    );

    return res.json({ accessToken });
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = refreshRouter;
