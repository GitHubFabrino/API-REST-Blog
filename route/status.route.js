const express = require("express");
const {
  ajouterStatus,
  getTousStatus,
  getOneStatus,
  deleteOneStatus,
} = require("../controller/status.controller");

const router = express.Router();

router.route("/status/creer").post(ajouterStatus);
router.route("/status/getAll").get(getTousStatus);
router.route("/status/getOne/:id").get(getOneStatus);
router.route("/status/deleteOne/:id").delete(deleteOneStatus);

module.exports = router;
