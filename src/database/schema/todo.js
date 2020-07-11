const { Schema, model } = require("mongoose");

const TodoSchema = new Schema(
  {
    title: { type: String, required: true },
    isDone: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, ref: "Account" },
  },
  { timestamps: true }
);

const Todo = model("Todo", TodoSchema);
module.exports = { Todo };
