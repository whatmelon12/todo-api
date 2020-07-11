/* eslint-disable no-unused-vars */
const errorHandler = (error, req, res, next) => {
  return res.status(500).send({
    message: error.message,
    stack: process.env.SHOW_STACK_TRACE === "true" ? error.stack : undefined,
  });
};

module.exports = { errorHandler };
