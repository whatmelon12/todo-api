const { Account } = require("../../database");

const register = (req, res) => {
  const account = new Account({ ...req.body });
  account.setPassword(req.body.password);

  account
    .save()
    .then((user) => res.send(user.toAuthJSON()))
    .catch((error) => res.status(400).send({ message: error.message }));
};

const login = (req, res) => {
  const { email, password } = req.body;
  Account.findOne({ email })
    .then((user) => {
      if (user && user.validPassword(password)) {
        return res.send(user.toAuthJSON());
      }
      return res.status(401).send({ message: "Invalid credentials." });
    })
    .catch((error) => res.status(400).send({ message: error.message }));
};

const profile = (req, res) => {
  const { user } = req;
  Account.findById(user._id)
    .then((user) => {
      const { firstName, lastName, email } = user;
      res.send({ firstName, lastName, email });
    })
    .catch((error) => res.status(400).send({ message: error.message }));
};

module.exports = {
  register,
  login,
  profile,
};
