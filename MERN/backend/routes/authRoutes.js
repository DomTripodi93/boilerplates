const express = require("express");
const authController = require("../controllers/authController");
const checkAuth = require("../middleware/checkAuth");

function routes(User) {
  const router = express.Router();
  const controller = authController(User);

  router.route("/register")
    .post(controller.postRegister);

  router.route("/login")
    .post(controller.postLogin);

  router.route("/updatePassword")
    .put(checkAuth, controller.putPassword);

  return router;
}

module.exports = routes;