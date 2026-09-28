const jwt = require("jsonwebtoken");
const authenticationmiddleare = async (req, res, next) => {
  try {
    let authorization = req.headers.authorization;

    const token = authorization.split(" ")[1];
    if (!token) {
      res.status(401).send({ message: "Token required" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id || decoded.payload?.id || decoded.payload };
    next();
  } catch (err) {
    res.status(401).send({ message: "Invalid token or expired" });
  }
};
module.exports = authenticationmiddleare;
