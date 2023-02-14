const mongoose = require("mongoose");
// const validator = require("validator");

const taskSchema = mongoose.Schema(
  {
    description: {
      type: String,
      trim: true,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
      // required: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

taskSchema.pre("save", async function (next) {
  const task = this;
  console.log("task pre: ", task);
  next();
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
