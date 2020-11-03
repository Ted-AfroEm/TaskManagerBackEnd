const router = require("express").Router();
const verify = require("../auth/verifyToken");

const User = require("../models/user");
const Task = require("../models/task");

router.delete("/", verify, async (req, res) => {
  //console.log(req.user._id);
  console.log(req.body._id);
  const deleteId = req.body._id;

  try {
    let deleteTask = await Task.deleteOne({ _id: deleteId });
    res.send(deleteTask);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
