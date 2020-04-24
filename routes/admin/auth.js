const express = require("express");
const usersRepo = require("../../repository/users");
const router = express.Router();

router.get("/signup", (req, res) => {
  res.send(
    `<p>Your ID is:${req.session.userID}</p>
    <div>
      <form method="POST">
        <input name="email" placeholder="email"></input>
        <input name="password" placeholder="password"></input>
        <input name="passwordConfirmation" placeholder="password confirm"></input>
        <button>Sign Up</button>
      </form>
    </div>`
  );
});

router.post("/signup", async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;
  const existingUser = await usersRepo.getOneBy({ email });
  if (existingUser) {
    return res.send("This email is already in used!");
  }
  if (password !== passwordConfirmation) {
    return res.send("password must match");
  }
  //Create a user in our user repo represent this person
  const user = await usersRepo.create({ email, password });

  //Store the id of that user inside the users cookie
  req.session.userID = user.id;

  res.send("Account created");
});
// ------ SIGN OUT route ---------
router.get("/signout", (req, res) => {
  req.session = null;
  res.send("You are logged out!");
});

//----- SIGN IN route -----------
router.get("/signin", (req, res) => {
  res.send(
    `<div>
      <form method="POST">
        <input name="email" placeholder="email"></input>
        <input name="password" placeholder="password"></input>
        <button>Sign In</button>
      </form>
    </div>`
  );
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
