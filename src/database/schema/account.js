const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { Schema, model } = require("mongoose");

const AccountSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, required: true, trim: true },
    salt: String,
    hash: String,
  },
  { timestamps: true }
);

AccountSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
};

AccountSchema.methods.validPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
  return this.hash === hash;
};

AccountSchema.methods.generateJWT = function () {
  return jwt.sign(
    {
      sub: this._id,
      email: this.email,
    },
    process.env.AUTH_SECRET,
    { expiresIn: "9999h" }
  );
};

AccountSchema.methods.toAuthJSON = function () {
  return {
    _id: this._id,
    email: this.email,
    firstName: this.firstName,
    lastName: this.lastName,
    token: this.generateJWT(),
  };
};

const Account = model("Account", AccountSchema);
module.exports = { Account };
