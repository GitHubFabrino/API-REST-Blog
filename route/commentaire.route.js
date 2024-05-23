const express = require("express");
const {
  ajouterCommentaire,
  getTousCommentaire,
  getOneCommentaire,
  deleteOneCommentaire,
} = require("../controller/commentaire.controller");
const router = express.Router();

router.route("/commentaire/creer").post(ajouterCommentaire);
router.route("/commentaire/getAll/:id_article").get(getTousCommentaire);
router.route("/commentaire/getOne/:id").get(getOneCommentaire);
router.route("/commentaire/deleteOne/:id").delete(deleteOneCommentaire);

module.exports = router;
