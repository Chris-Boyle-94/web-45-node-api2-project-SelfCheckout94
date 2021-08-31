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

// router.put("/:id", async (req, res) => {
//   const { id } = req.params;
//   const { body } = req;
//   const updatedPost = await Posts.update(id, body);
//   try {
//   } catch (err) {
//     res.status(500).json({
//       message: "The post information could not be modified",
//     });
//   }
// });

module.exports = router;
