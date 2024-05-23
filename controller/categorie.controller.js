const Categorie = require("../model/categorie.model");

const ajouterCategorie = (req, res) => {
  let categorie = new Categorie(req.body.nom_categorie);

  Categorie.createCategorie(categorie, (err, data) => {
    if (err) {
      res.status(500).send({
        message: "une erreur est produite",
      });
      return;
    }
    res.status(200).json(data);
  });
};

const getTousCategorie = (req, res) => {
  Categorie.getAllCategorie((err, data) => {
    if (err) {
      res.status(500).send({ message: "une erreur est produite" });
      return;
    }
    res.status(200).json(data);
  });
};
const getOneCategorie = (req, res) => {
  let id = req.params.id;
  Categorie.getOneCategorie(id, (err, data) => {
    if (data == null) {
      res.status(500).send({ message: "une erreur est produite" });
      return;
    }
    res.status(200).json(data);
  });
};
const deleteCategorie = (req, res) => {
  let id = req.params.id;
  console.log(id);
  Categorie.deleteCategorie(id, (err, data) => {
    if (data == null) {
      res.status(500).send({ message: "une erreur est produite" });
      return;
    }
    res.status(200).json(data);
  });
};

module.exports = {
  ajouterCategorie,
  getTousCategorie,
  getOneCategorie,
  deleteCategorie,
};
