const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const Users = require("./../models/Users");

//@dummy_route    GET /test
//@desc           Testing route for auth middleware...
router.get("/test", auth, async (req, res) => {
  try {
    console.log("Called test route");
    console.log(req.user);
  } catch (error) {
    console.log(error);
  }
});

//@route     GET /user
//@desc       Send the details of logged in user
router.get("/user", auth, async (req, res) => {
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
