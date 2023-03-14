const express = require("express");

const app = express();

const port = 3000;

const mongoose = require("mongoose");

const cors = require("cors");
app.use(cors());

//import routesAuth
const authRoute = require("./auth/userAuth");
const addTask = require("./routes/addTask");
const fetchTask = require("./routes/fetchTask");
const deleteTask = require("./routes/deleteTask");
const progressTask = require("./routes/progressTask");

// for cloud Database
const { DB_CONNECT } = require("./config/constants");

connect to DB
mongoose.connect(
  DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to DB!")
);

//for local Database
// mongoose.connect(
//   "mongodb://localhost/taskManager",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   },
//   () => console.log("Connected to DB!")
// );

//middleware
app.use(express.json());

//route middleware
app.use("/api/user", authRoute);
app.use("/api/user/addtask", addTask);
app.use("/api/user/tasks", fetchTask);
app.use("/api/user/deletetask", deleteTask);
app.use("/api/user/progressupdate", progressTask);

app.listen(port, () =>
  console.log(`Server is up and running on localhost ${port}`)
);
