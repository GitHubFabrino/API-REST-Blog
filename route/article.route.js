const express = require("express");

const {
  ajouterArticle,
  getTousArticle,
  getOneArticle,
  deleteArticle,
} = require("../controller/article.controller");

const router = express.Router();

router.route("/article/creer").post(ajouterArticle);
router.route("/article/getAll").get(getTousArticle);
router.route("/article/getOne/:id").get(getOneArticle);
router.route("/article/deleteOne/:id").delete(deleteArticle);

module.exports = router;
