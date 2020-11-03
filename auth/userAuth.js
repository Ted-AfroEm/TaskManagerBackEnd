//task-manager
//N9VrS55Xgqfm05Sa
const router = require("express").Router();
const verify = require("./verifyToken");

const User = require("../models/user");
const {
  registerValidation,
  loginValidation,
} = require("../validation/validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { TOKEN_SECRET } = require("../config/constants");

router.post("/signup", async (req, res) => {
  //res.send("signUp Please");
  //checking if the user is already in the database
  const emailExist = await User.findOne({ email: req.body.email });
  //if (emailExist) console.log("Email already exists");
  if (emailExist)
    return res
      .status(400)
      .send({ error: "A user with this email address already exists" });

  //validate the data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //HASH THE Password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashPassword,
  });
  // try {
  //   const savedUser = await user.save();
  //   res.send(savedUser);
  // } catch (err) {
  //   res.status(400).send(err);
  // }
  const savedUser = await user.save();
    //create and assign a token
  const token = jwt.sign({ _id: savedUser._id }, TOKEN_SECRET);

  let fetchName = await User.find({ _id: savedUser.id });
  let firstName = fetchName[0].firstName;

  //res.status(200).send({ token });
  
  res.status(200).send({ user: firstName, token: token });


});
//Login
router.post("/login", async (req, res) => {
  //validation
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //checking if the email user exist
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(401).send({ error: "Incorrect email or password" });

  //password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass)
    return res.status(401).send({ error: "Incorrect email or password" });

  //create and assign a token
  const token = jwt.sign({ _id: user._id }, TOKEN_SECRET);

  let fetchName = await User.find({ _id: user.id });
  let firstName = fetchName[0].firstName;
  
  const UserData = {
    Name: firstName,
    id: user.id,
  
  }
  //res.status(200).send({ token });
  
  res.status(200).send({ user: UserData, token: token });

  //res.header("auth-token", token).send(token);
  //res.send("Logged in!");
});

router.get('/', verify, async (req, res) => {
  const user = req.user._id;
  const token = jwt.sign({ _id: user._id }, TOKEN_SECRET);

  let fetchName = await User.find({ _id: user.id });
  let firstName = fetchName[0].firstName;

  //res.status(200).send({ token });
  
  res.status(200).send({ user: firstName, token: token });
})

module.exports = router;
