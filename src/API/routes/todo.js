const { Router } = require("express");
const { authHandler } = require("../middleware");
const controller = require("../controller/todo");

const router = Router();

router.use("/todo", authHandler);
router.route("/todo").get(controller.getAll).post(controller.create);
router
  .route("/todo/:id")
  .get(controller.getById)
  .patch(controller.update)
  .delete(controller.remove);

module.exports = router;
