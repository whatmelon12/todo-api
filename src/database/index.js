const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASS,
});

module.exports = {
  ...require("./schema/account"),
  ...require("./schema/todo"),
};
