const express = require("express");
const {
  ajouterCategorie,
  getTousCategorie,
  getOneCategorie,
  deleteCategorie,
} = require("../controller/categorie.controller");

const router = express.Router();

router.route("/categorie/creer").post(ajouterCategorie);
router.route("/categorie/getAll").get(getTousCategorie);
router.route("/categorie/getOne/:id").get(getOneCategorie);
router.route("/categorie/deleteOne/:id").delete(deleteCategorie);

module.exports = router;
