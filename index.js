const express = require("express");
const bodyParser = require("body-parser");
const usersRepo = require("./repository/users");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(
    `<div>
    <form method="POST">
      <input name="email" placeholder="email"></input>
      <input name="password" placeholder="password"></input>
      <input name="passwordConfirm" placeholder="password confirm"></input>
      <button>Sign Up</button>
    </form>
  </div>`
  );
});

app.post("/", async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;
  const existingUser = await usersRepo.getOneBy({ email });
  if (existingUser) {
    return res.send("This email is already in used!");
  }
  if (password !== passwordConfirmation) {
    return res.send("password must match");
  }

  res.send("Account created");
});

app.listen(3000, () => {
  console.log("Port 3000 is running");
});
