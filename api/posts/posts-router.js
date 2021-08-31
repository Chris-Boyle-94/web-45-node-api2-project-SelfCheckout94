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

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const post = await Posts.findById(id);
  try {
    !post
      ? res.status(404).json({
          message: "The post with the specified ID does not exist",
        })
      : res.status(200).json(post);
  } catch (err) {
    res.status(500).json({
      message: "The post information could not be retrieved",
    });
  }
});

router.post("/", async (req, res) => {
  const { body } = req;
  const newPost = await Posts.insert(body);
  try {
    !body.title || !body.contents
      ? res.status(400).json({
          message: "Please provide title and contents for the post",
        })
      : res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({
      message: "There was an error while saving the post to the database",
    });
  }
});

module.exports = router;
