const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const authenticatedToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Autorisation échouée. JWT token requis" });
  }

  try {
    const decoded = await jwt.verify(authHeader, ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: error.message});
  }
};

module.exports = authenticatedToken;
