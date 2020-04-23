const express = require("express");
const bodyParser = require("body-parser");

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

app.post("/", (req, res) => {
  console.log(req.body);
});

app.listen(3000, () => {
  console.log("Port 3000 is running");
});
