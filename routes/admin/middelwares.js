const { validationResult } = require("express-validator");

module.exports = {
  handelErrors(templateFunc, dataCb) {
    return async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let data = {};
        if (dataCb) {
          data = await dataCb(req);
        }
        return res.send(templateFunc({ errors, ...data }));
      }

      next();
    };
  },
  requireAuth(req, res, next) {
    if (!req.session.userID) {
      return res.redirect("/signin");
    }

    next();
  }
};
