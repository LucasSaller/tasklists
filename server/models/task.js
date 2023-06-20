const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  progress: {
    type: Number,
  },
  status: {
    type: String,
  },
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
