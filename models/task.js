const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  owner: {
    type: String,
    required: true,
  },
  taskName: {
    type: String,
    required: true,
    min: 2,
    max: 30,
  },
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Task", taskSchema);
