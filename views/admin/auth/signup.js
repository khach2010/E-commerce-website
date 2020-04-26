const layout = require("../layout");
const { getError } = require("../../helpers");

module.exports = ({ req, errors }) => {
  return layout({
    content: `
  <div>
    Your ID is:${req.session.userID}
    <form method="POST">
      <input name="email" placeholder="email"></input>
      ${getError(errors, "email")}
      <input name="password" placeholder="password"></input>
      ${getError(errors, "password")}
      <input name="passwordConfirmation" placeholder="password confirm"></input>
      ${getError(errors, "passwordConfirmation")}
      <button>Sign Up</button>
    </form>
  </div>`
  });
};
