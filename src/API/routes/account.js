const { Router } = require("express");
const controller = require("../controller/account");

const router = Router();

router.post("/account/register", controller.register);
router.post("/account/login", controller.login);
router.get("/account/me", controller.profile);

module.exports = router;
