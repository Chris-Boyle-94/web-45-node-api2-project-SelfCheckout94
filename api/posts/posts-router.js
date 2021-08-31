// implement your posts router here
const Posts = require("./posts-model");
const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const posts = await Posts.find(req.query);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({
      message: "The posts information could not be retrieved",
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Posts.findById(id);
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

router.get("/:id/comments", async (req, res) => {
  const { id } = req.params;
  const post = await Posts.findById(id);
  try {
    if (!post) {
      res.status(404).json({
        message: "The post with the specified ID does not exist",
      });
    } else {
      const comments = await Posts.findPostComments(id);
      res.status(200).json(comments);
    }
  } catch (err) {
    res.status(500).json({
      message: "The comments information could not be retrieved",
    });
  }
});

router.post("/", async (req, res) => {
  const { title, contents } = req.body;
  try {
    if (!title || !contents) {
      res.status(400).json({
        message: "Please provide title and contents for the post",
      });
    } else {
      const newPost = await Posts.insert({ title, contents });
      const post = await Posts.findById(newPost.id);
      res.status(201).json(post);
    }
  } catch (err) {
    res.status(500).json({
      message: "There was an error while saving the post to the database",
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  const post = await Posts.findById(id);
  try {
    if (!post) {
      res.status(404).json({
        message: "The post with the specified ID does not exist",
      });
    } else if (!title || !contents) {
      res.status(400).json({
        message: "Please provide title and contents for the post",
      });
    } else {
      const updatedPost = await Posts.update(id, req.body);
      const displayPost = await Posts.findById(updatedPost);
      res.status(200).json(displayPost);
    }
  } catch (err) {
    res.status(500).json({
      message: "The post information could not be modified",
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const post = await Posts.findById(id);
  try {
    if (!post) {
      res.status(404).json({
        message: "The post with the specified ID does not exist",
      });
    } else {
      await Posts.remove(id);
      res.status(200).json(post);
    }
  } catch (err) {
    res.status(500).json({
      message: "The post could not be removed",
    });
  }
});

module.exports = router;
