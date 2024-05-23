const Commentaire = require("../model/commentaire.model");

const ajouterCommentaire = (req, res) => {
  const date = new Date();
  let option = { year: "numeric", month: "2-digit", day: "2-digit" };
  let formateDate = new Intl.DateTimeFormat("fr-FR", option).format(date);

  const commentaire = new Commentaire(
    req.body.contenu_commentaire,
    req.body.id_utilisateur,
    req.body.id_article,
    formateDate
  );
  console.log("ici : ", commentaire);

  Commentaire.createCommentaire(commentaire, (err, data) => {
    if (err) {
      res.status(500).send({
        message: "une erreur est produite",
      });
      return;
    }
    res.status(200).json(data);
  });
};

const getTousCommentaire = (req, res) => {
  let id_article = req.params.id_article;
  Commentaire.getAllCommentaire(id_article, (err, data) => {
    if (err) {
      res.status(500).send({ message: "une erreur est produite" });
      return;
    }
    res.status(200).json(data);
  });
};

const getOneCommentaire = (req, res) => {
  let id = req.params.id;
  Commentaire.getOneCommentaire(id, (err, data) => {
    if (data == null) {
      res.status(500).send({ message: "une erreur est produite" });
      return;
    }
    res.status(200).json(data);
  });
};

const deleteOneCommentaire = (req, res) => {
  let id = req.params.id;
  Commentaire.deleteOneCommentaire(id, (err, data) => {
    if (data == null) {
      res.status(500).send({ message: "une erreur est produite" });
      return;
    }
    res.status(200).json(data);
  });
};

module.exports = {
  ajouterCommentaire,
  getTousCommentaire,
  getOneCommentaire,
  deleteOneCommentaire,
};
