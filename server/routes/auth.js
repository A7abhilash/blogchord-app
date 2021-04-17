const express = require("../node_modules/express");
const passport = require("passport");
const router = express.Router();

//@router     GET /auth/google
//@desc       Auth with Google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

//@route    GET /auth/google/callback
//@desc     Google auth callback(success)
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

//@route    GET /auth/logout
//@desc     Logout User
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(`${process.env.FRONTEND_URL}/`);
});

module.exports = router;
