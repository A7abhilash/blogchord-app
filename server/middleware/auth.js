module.exports = {
  ensureAuth: function (request, response, next) {
    if (request.isAuthenticated()) {
      return next();
    } else {
      response.redirect(`${process.env.FRONTEND_URL}/`);
    }
  },
  ensureGuest: function (request, response, next) {
    if (request.isAuthenticated()) {
      response.redirect(`${process.env.FRONTEND_URL}/dashboard`);
    } else {
      return next();
    }
  },
};
