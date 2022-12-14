const jwt = require("jsonwebtoken");
// Envs
const { ACCESS_TOKEN_SECRET } = process.env;

const validateToken = async (req, res, next) => {
  const { authorization } = req.headers;

  try {
    const token = authorization && authorization.split("Bearer ")[1];
    const decoded = await jwt.verify(token, ACCESS_TOKEN_SECRET);
    req.decodedToken = decoded;

    next();
  } catch (err) {
    if (err?.name === "JsonWebTokenError") {
      res.status(403).json({ message: "Invalid token" });
      return;
    }

    if (err?.name === "TokenExpiredError") {
      res.status(403).json({ message: "Invalid token" });
      return;
    }

    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = validateToken;
