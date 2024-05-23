const express = require("express");
const { signIn } = require("../controller/singIn.controller");
const router = express.Router();

router.route("/singIn").post(signIn);

module.exports = router;
