const jwt = require("jsonwebtoken");
const User = require("../model/User");

const authenticate = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const result = jwt.verify(token, process.env.PRIVATE_KEY);
    if (!result) {
      throw new Error("missing token");
    }
    User.findById(result.userId)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((err) => {
        throw new Error(err);
      });
  } catch (err) {
    console.log(err);
    return res
      .status(401)
      .json({ success: false, message: "Missing Jwt token" });
  }
};

module.exports = {
  authenticate,
};
