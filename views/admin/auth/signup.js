const layout = require("../layout");

const getErrors = (errors, prop) => {
  try {
    return errors.mapped()[prop].msg;
  } catch (err) {
    return "";
  }
};

module.exports = ({ req, errors }) => {
  return layout({
    content: `<p>Your ID is:${req.session.userID}</p>
  <div>
    <form method="POST">
      <input name="email" placeholder="email"></input>
      ${getErrors(errors, "email")}
      <input name="password" placeholder="password"></input>
      ${getErrors(errors, "password")}
      <input name="passwordConfirmation" placeholder="password confirm"></input>
      ${getErrors(errors, "passwordConfirmation")}
      <button>Sign Up</button>
    </form>
  </div>`
  });
};
