const jwt = require("jsonwebtoken");

const authHandler = (req, res, next) => {
  const authorization = req.headers["authorization"];
  if (!authorization) {
    return res
      .status(401)
      .send({ message: "Provide a valid authenticaton method." });
  }

  const token = authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.AUTH_SECRET);
    req.user = {
      _id: decoded.sub,
      token,
    };
    return next();
  } catch (error) {
    return res
      .status(401)
      .send({ message: "Provide a valid authenticaton method." });
  }
};

module.exports = { authHandler };
