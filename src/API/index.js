const cwd = require("path").dirname(require.main.filename);
const { Router } = require("express");
const { errorHandler } = require("./middleware");
const todoRouter = require("./routes/todo");
const accountRouter = require("./routes/account");

module.exports = (app) => {
  const router = Router();
  router.use("/api", accountRouter, todoRouter);

  const docsRouter = Router();
  docsRouter
    .route("/")
    .get((_, res) => res.sendFile(`${cwd}/API/views/index.html`));

  app.use(router, docsRouter, errorHandler);
};
