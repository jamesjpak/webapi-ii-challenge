const db = require("../data/db");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const posts = await db.find(req.query);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "The posts information could not be retrieved." });
  }
});

  router.get("/:id", async (req, res) => {
    try {
      const post = await db.findById(req.params.id)

      if (post) {
        res.status(200).json(post)
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
      }
    } catch (error) {
      res.status(500).json({ error: "The post information could not be retrieved." })
    }
});


router.post("/", async (req, res) => {
  try {
    const { title, contents } = req.body;

    const post = await db.insert(req.body);

    if (!title || !contents) {
      res
        .status(400)
        .json({
          errorMessage: "Please provide title and contents for the post."
        });
    } else {
      db.insert({ title, contents }).then(post => {
        res.status(201).json(post);
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "There was an error while saving the post to the database"
    });
  }
});

router.post("/:id/comments", async (req, res) => {

  try {

    const { text } = req.body
    if ( !text ) {
      res.status(400).json({ errorMessage: "Please provide text for the comment." })
    } else {
      db.insert({ text }).then(comment => {
        res.status(201).json(comment);
      })
    }
  } catch (error) {
    res.status(500).json({ error: "There was an error while saving the comment to the database" })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const count = await db.remove(req.params.id)

    if (count > 0) {
      res.status(200).json({ message: "Delete success!" })
    } else {
      res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
  } catch (error) {
    res.status(500).json({ error: "The post could not be removed" })
  }
})

module.exports = router;
