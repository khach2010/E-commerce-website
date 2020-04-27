const express = require("express");

const { handelErrors } = require("./middelwares");
const usersRepo = require("../../repository/users");
const signupTemplate = require("../../views/admin/auth/signup");
const signinTemplate = require("../../views/admin/auth/signin");
const {
  // Sign Up
  requireEmail,
  requirePassword,
  requirePasswordConfirmation,
  //Sign In
  requireEmailExists,
  requireValidPasswordForUser
} = require("./validator");
const router = express.Router();

router.get("/signup", (req, res) => {
  res.send(signupTemplate({ req }));
});

router.post(
  "/signup",
  [requireEmail, requirePassword, requirePasswordConfirmation],
  handelErrors(signupTemplate),
  async (req, res) => {
    const { email, password } = req.body;
    //Create a user in our user repo represent this person
    const user = await usersRepo.create({ email, password });
    //Store the id of that user inside the users cookie
    req.session.userID = user.id;

    res.send("Account created");
  }
);
// ------ SIGN OUT route ---------
router.get("/signout", (req, res) => {
  req.session = null;
  res.send("You are logged out!");
});

//----- SIGN IN route -----------
router.get("/signin", (req, res) => {
  res.send(signinTemplate({}));
});
router.post(
  "/signin",
  [requireEmailExists, requireValidPasswordForUser],
  handelErrors(signinTemplate),
  async (req, res) => {
    const { email } = req.body;

    const user = await usersRepo.getOneBy({ email });

    req.session.userID = user.id;

    res.send("You are signed in");
  }
);

module.exports = router;
