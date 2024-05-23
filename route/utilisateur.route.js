const express = require("express");
const {
  ajouterUtilisateur,
  getTousUtilisateur,
  getOnUtilisateur,
  deleteOnUtilisateur,
} = require("../controller/utilisateur.controller");
const router = express.Router();

router.route("/utilisateur/creer").post(ajouterUtilisateur);
router.route("/utilisateur/getAll").get(getTousUtilisateur);
router.route("/utilisateur/getOne/:id").get(getOnUtilisateur);
router.route("/utilisateur/deleteOne/:id").delete(deleteOnUtilisateur);

module.exports = router;
