const router = require("express").Router();
const { ensureAuth } = require("../middleware/auth");
const Blog = require("../models/Blogs");
const User = require("../models/Users");
const Bookmark = require("../models/Bookmarks");

//*route    /users/:id
//*desc     Fetch the required user's blogs
router.get("/:id", ensureAuth, async (req, res) => {
  try {
    try {
      const user = await User.findById(req.params.id);
      if (!user) throw "Error";
      const blogs = await Blog.find({ user: req.params.id, status: "Public" })
        .populate("user")
        .sort({ createdAt: "desc" })
        .lean();
      res.status(200).json({ user, blogs });
    } catch (error) {
      // console.error(error);
      res.status(404).json({ msg: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

//*route    /users/auth/:id
//*desc     Fetch the logged in user's blogs & notifications
router.get("/auth/:id", ensureAuth, async (req, res) => {
  try {
    if (req.params.id.toString() === req.user._id.toString()) {
      const blogs = await Blog.find({ user: req.params.id })
        .populate("user")
        .sort({ createdAt: "desc" })
        .lean();
      const savedBlogsList = await Bookmark.findOne({ user: req.params.id });
      // console.log(savedBlogsList);
      const allBlogs = await Blog.find().populate("user").lean();
      // console.log(allBlogs);
      const savedBlogs = [];
      if (savedBlogsList) {
        savedBlogsList.blogs.forEach((blogId) => {
          allBlogs.forEach((blog) => {
            if (
              blog._id.toString() === blogId &&
              blog._id.toString() !== req.params.id.toString()
            ) {
              if (blog.status === "Public") {
                savedBlogs.push(blog);
              } else {
                // console.log(blogId);
                let item = {
                  _id: blogId,
                  body:
                    "This blog has been deleted or turned into private status by the author.",
                  status: "NotFound",
                };
                savedBlogs.push(item);
              }
            }
          });
        });
      }
      // console.log(savedBlogs);
      return res.status(200).json({ blogs, savedBlogs, savedBlogsList });
    }
    return res.status(400).json({ msg: "404 Error" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;

//*route    /users/bookmarks
//*desc     add/remove a blog to/from bookmark
router.patch("/bookmarks", ensureAuth, async (req, res) => {
  try {
    try {
      if (req.body.userId.toString() !== req.user.id.toString()) {
        throw "Error";
      }
      let savedBlogsList = await Bookmark.findOne({
        user: req.body.userId,
      });
      // console.log(req.body);
      await savedBlogsList.updateOne(req.body);
      return res.status(200).json({ status: 200, msg: "Bookmarks updated" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ status: 400, msg: "404 Error" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, msg: "Server Error" });
  }
});
