const { Todo } = require("../../database");

const create = (req, res) => {
  delete req.body._id;
  const todo = new Todo({
    ...req.body,
    user: req.user._id,
  });

  todo
    .save()
    .then((doc) => res.status(201).send(doc))
    .catch((error) => res.status(400).send({ message: error.message }));
};

const getAll = (req, res) => {
  Todo.find({ user: req.user._id })
    .then((docs) => res.send(docs))
    .catch((error) => res.status(400).send({ message: error.message }));
};

const getById = (req, res) => {
  Todo.findById(req.params.id)
    .then((doc) => {
      if (!doc) {
        return res.status(404).send({ message: "Not found." });
      }
      return res.send(doc);
    })
    .catch((error) => res.status(400).send({ message: error.message }));
};

const update = (req, res) => {
  const { isDone } = req.body;
  Todo.findByIdAndUpdate(req.params.id, { isDone }, { new: true })
    .then((doc) => {
      if (!doc) {
        return res.status(404).send({ message: "Not found." });
      }
      return res.send(doc);
    })
    .catch((error) => res.status(400).send({ message: error.message }));
};

const remove = (req, res) => {
  Todo.findByIdAndDelete(req.params.id)
    .then((doc) => {
      if (!doc) {
        return res.status(404).send({ message: "Not found." });
      }
      return res.send(doc);
    })
    .catch((error) => res.status(400).send({ message: error.message }));
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
