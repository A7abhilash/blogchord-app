const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("./../middleware/auth");

const Users = require("./../models/Users");

//Add ensureAuth whenever u wanna check whether the user is authenticated or not...

//@route     GET /index
//@desc       Welcome Homepage
router.get("/", ensureGuest, (req, res) => {
  res.redirect(`${process.env.FRONTEND_URL}/`);
});

//@route     GET /dashboard
//@desc       Open Dashboard when succesfully logged In
router.get("/dashboard", ensureAuth, (req, res) => {
  res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
});

//@route     GET /user
//@desc       Send the details of logged in user
router.get("/user", async (req, res) => {
  try {
    if (req.user) {
      let user = await Users.findOne({ googleId: req.user.googleId });
      // console.log(user);
      return res.json({ user });
    }
    return res.json(null);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

//@route     GET /newUser
//@desc       Add new user
router.post("/newUser", async (req, res) => {
  const newUser = req.body;
  // console.log(req.body);
  try {
    let user = await Users.findOne({ googleId: newUser.googleId });
    if (user) {
      return res.json({ msg: "User logged in successfully!!!", user });
    }
    user = await User.create(newUser);
    await Bookmark.create({
      user: user._id,
      blogs: [user._id.toString()],
    });
    return res.json({ msg: "New user created successfully!!!", user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
