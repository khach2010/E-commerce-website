const layout = require("../layout");

module.exports = ({ req }) => {
  return layout({
    content: `<p>Your ID is:${req.session.userID}</p>
  <div>
    <form method="POST">
      <input name="email" placeholder="email"></input>
      <input name="password" placeholder="password"></input>
      <input name="passwordConfirmation" placeholder="password confirm"></input>
      <button>Sign Up</button>
    </form>
  </div>`
  });
};
