const router = require("express").Router();
const verify = require("../auth/verifyToken");

const Task = require("../models/task");

router.post("/", verify, async (req, res) => {
  const taskName = req.body.task;
  const task = new Task({
    owner: req.user._id,
    taskName: req.body.task,
  });

  try {
    const savedTask = await task.save();
    res.send(savedTask);
  } catch (err) {
    res.status(400).send(err);
  }
  //console.log(taskName);

  // res.json({
  //   posts: {
  //     title: "my first post",
  //     description: "random data you should not access",
  //   },
  // });
  //res.send(req.user._id);
  //res.send(taskName);
});

module.exports = router;
