const jwt = require("jsonwebtoken");
const { JWT_PRIVATE_KEY } = require("../config");
const { getUserByEmail } = require("../controllers/user");

const isUserValid = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    // perform user validation
    const decoded = jwt.verify(token, JWT_PRIVATE_KEY);
    const user = await getUserByEmail(decoded.email);

    // if user exist
    if (user) {
      // this is a valid user
      req.user = user;
      // trigger the next function
      next();
    } else {
      // this is not a valid user
      res.status(403).send({
        message: "You are not authorized to perform this action",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(401).json({ msg: "Unauthorized" });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    // perform user validation
    const decoded = jwt.verify(token, JWT_PRIVATE_KEY);
    const user = await getUserByEmail(decoded.email);

    // if user exist
    if (user&&user.role==="admin") {
      // this is a valid user
      req.user = user;
      // trigger the next function
      next();
    } else {
      // this is not a valid user
      res.status(403).send({
        message: "You are not authorized to perform this action",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(401).json({ msg: "Unauthorized" });
  }
};
module.exports = { isUserValid, isAdmin };
