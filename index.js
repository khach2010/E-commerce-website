const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const usersRepo = require("./repository/users");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ["iloveyou"]
  })
);

app.get("/signup", (req, res) => {
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

app.post("/signup", async (req, res) => {
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
app.get("/signout", (req, res) => {
  req.session = null;
  res.send("You are logged out!");
});

//----- SIGN IN route -----------
app.get("/signin", (req, res) => {
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
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await usersRepo.getOneBy({ email });
  if (!user) {
    return res.send("Email not found");
  }
  if (user.password !== password) {
    return res.send("invalid password");
  }
  req.session.userID = user.id;
  res.send("You are signed in");
});

app.listen(3000, () => {
  console.log("Port 3000 is running");
});
