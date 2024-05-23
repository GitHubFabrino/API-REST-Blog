const express = require("express");
const {
  ajouterLike,
  getTousLike,
  getOneLike,
  deleteOneLike,
} = require("../controller/likes.controller");

const router = express.Router();

router.route("/likes/creer").post(ajouterLike);
router.route("/likes/getAll/:id_article").get(getTousLike);
router.route("/likes/getOne/:id").get(getOneLike);
router.route("/likes/deleteOne/:id").delete(deleteOneLike);

module.exports = router;
