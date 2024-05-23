const Utilisateur = require("../model/utilisateur.model");
const bcrypt = require("bcrypt");

const ajouterUtilisateur = (req, res) => {
  bcrypt.hash(req.body.mdp, 10, (err, hash) => {
    if (err) {
      res.status(500).send({
        message: "Une erreur s'est produite lors du cryptage du mot de passe.",
      });
      return;
    }

    let utilisateur = new Utilisateur(req.body.nom, req.body.email, hash);

    Utilisateur.createUtilisateur(utilisateur, (err, data) => {
      if (err) {
        res.status(500).send({
          message: "une erreur est produite",
        });
        return;
      }
      res.status(200).json(data);
    });
  });
};

const getTousUtilisateur = (req, res) => {
  Utilisateur.getAllUtilisateur((err, data) => {
    if (err) {
      res.status(500).send({ message: "une erreur est produite" });
      return;
    }
    res.status(200).json(data);
  });
};

const getOnUtilisateur = (req, res) => {
  let id = req.params.id;
  Utilisateur.getOnUtilisateur(id, (err, data) => {
    if (data == null) {
      res.status(500).send({ message: "une erreur est produite" });
      return;
    }
    res.status(200).json(data);
  });
};

const deleteOnUtilisateur = (req, res) => {
  let id = req.params.id;
  Utilisateur.deleteOnUtilisateur(id, (err, data) => {
    if (data == null) {
      res.status(500).send({ message: "une erreur est produite" });
      return;
    }
    res.status(200).json(data);
  });
};

module.exports = {
  ajouterUtilisateur,
  getTousUtilisateur,
  getOnUtilisateur,
  deleteOnUtilisateur,
};
