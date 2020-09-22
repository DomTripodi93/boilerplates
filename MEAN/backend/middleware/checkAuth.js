const jwt = require("jsonwebtoken");
const env = require("../.env/env");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS"){
    next();
  } else {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, env.tokenKey);
      req.userId = decodedToken.userId;
      req.name = decodedToken.name;
      next();
    } catch (error) {
      res.status(401).json({ message: "Auth failed!" });
    }
  }
};
