const router = require("express").Router();
const verify = require("../auth/verifyToken");

const User = require("../models/user");
const Task = require("../models/task");

router.patch("/", verify, async (req, res) => {
  console.log(req.body);
  let id = req.body._id;
  let progress = req.body.progress;

  try {
    let progressUpdate = await Task.updateOne(
      { _id: id },
      { progress: progress }
    );
    res.send(progressUpdate);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
