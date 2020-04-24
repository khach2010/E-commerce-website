const express = require("express");
const { check, validationResult } = require("express-validator");
const usersRepo = require("../../repository/users");
const signupTemplate = require("../../views/admin/auth/signup");
const signinTemplate = require("../../views/admin/auth/signin");
const router = express.Router();

router.get("/signup", (req, res) => {
  res.send(signupTemplate({ req }));
});

router.post(
  "/signup",
  [
    check("email")
      .trim()
      .normalizeEmail()
      .isEmail()
      .custom(async email => {
        const existingUser = await usersRepo.getOneBy({ email });
        if (existingUser) {
          throw new Error("Email in use");
        }
      }),
    check("password")
      .trim()
      .isLength({ min: 4, max: 20 }),
    check("passwordConfirmation")
      .trim()
      .isLength({ min: 4, max: 20 })
      .custom((passwordConfirmation, { req }) => {
        if (passwordConfirmation !== req.body.password) {
          throw new Error("Passwords must mactch");
        }
      })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);

    const { email, password, passwordConfirmation } = req.body;

    if (password !== passwordConfirmation) {
      return res.send("password must match");
    }
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
  res.send(signinTemplate());
});
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await usersRepo.getOneBy({ email });
  if (!user) {
    return res.send("Email not found");
  }

  const validPassword = await usersRepo.comparePassword(
    user.password,
    password
  );

  if (!validPassword) {
    return res.send("invalid password");
  }
  req.session.userID = user.id;
  res.send("You are signed in");
});

module.exports = router;
