const router = require("express").Router();
const Blog = require("./../models/Blogs");

//*route    /blogs/post
//*desc     Post a new blog
router.post("/post", async (req, res) => {
  try {
    // console.log(req.body);
    let blog = await Blog.create(req.body);
    res.status(200).json({ blog, msg: "New blog posted 👌." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error, Please try later." });
  }
});

//*route    /blogs/
//*desc     Display all public blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find({ status: "Public" })
      .populate("user")
      .sort({ createdAt: "desc" })
      .lean();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Server error, Please try later." });
  }
});

//*route    /blogs/edit/:id
//*desc     Edit a blog
router.patch("/edit/:id", async (req, res) => {
  try {
    // console.log(req.body);
    try {
      let blog = await Blog.findById(req.params.id);
      if (!blog) {
        throw "Error";
      }
      await blog.updateOne(req.body);
      res.status(200).json({ msg: "Edited blog 👍" });
    } catch (error) {
      return res.status(400).json({ msg: "404 Error" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Server error, Please try later." });
  }
});

//*route    /blogs/updateLikes/:id
//*desc     update likes on a blog
router.patch("/updateLikes/:id", async (req, res) => {
  try {
    // console.log(req.body);
    let blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(400).json({ error: "404 Error" });
    }
    await blog.updateOne(req.body);
    res.status(200).json({ msg: "Liked" });
  } catch (error) {
    res.status(500).json({ error: "Server error, Please try later." });
  }
});

//*route    /blogs/delete/:id
//*desc     Delete a blog
router.delete("/delete/:id", async (req, res) => {
  try {
    console.log("Blog" + req.params.id);
    try {
      let blog = await Blog.findById(req.params.id);
      if (!blog) {
        throw "Error";
      }
      await blog.deleteOne(req.body);
      res.status(200).json({ msg: "Blog deleted 👀" });
    } catch (error) {
      return res.status(400).json({ msg: "404 Error" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Server error, Please try later." });
  }
});

module.exports = router;
