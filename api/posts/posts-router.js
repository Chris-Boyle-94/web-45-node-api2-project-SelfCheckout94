// implement your posts router here
const Posts = require("./posts-model");
const router = require("express").Router();

router.get("/", async (req, res) => {
  const posts = await Posts.find(req.query);
  try {
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({
      message: "The posts information could not be retrieved",
    });
  }
});

module.exports = router;
