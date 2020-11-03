const router = require("express").Router();
const verify = require("../auth/verifyToken");

const User = require("../models/user");
const Task = require("../models/task");

router.get("/", verify, async (req, res) => {
  //identify user name from user collection
  const ownerId = req.user._id;
  //console.log(req.user);
  // let fetechedTasks;
  // Task.find({ owner: ownerId })
  //   .then((data) => {
  //     fetechedTasks = data;
  //     console.log({ fetechedTasks });
  //     res.send(fetechedTasks);
  //   })
  //   .catch((err) => {
  //     res.status(400).send(err);
  //   });
  //send list of task and user full name
  try {
    let fetchedTasks = await Task.find({ owner: ownerId });
    let fetchName = await User.find({ _id: ownerId });
    //console.log({ fetchedTasks });
    let firstName = fetchName[0].firstName;

    res.send({ tasks: fetchedTasks, user: firstName });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
