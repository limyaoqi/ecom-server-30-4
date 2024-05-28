const express = require("express");
const { signUpUser, loginUser } = require("../controllers/user");
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const signup = await signUpUser(name, email, password);
    if (signup) {
      res.status(200).send({ signup, message: "Sign up successfully" });
    }
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const loginuser = await loginUser(email, password);

    res.status(200).send({ loginuser, message: "Login up successfully" });
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
});

module.exports = router;
