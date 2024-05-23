const Article = require("../model/article.model");

const ajouterArticle = (req, res) => {
  const date = new Date();
  let option = { year: "numeric", month: "2-digit", day: "2-digit" };
  let formateDate = new Intl.DateTimeFormat("fr-FR", option).format(date);

  let article = new Article(
    req.body.titre,
    req.body.contenu,
    formateDate,
    req.body.id_categorie,
    req.body.id_utilisateur,
    req.body.image
  );

  Article.createArticle(article, (err, data) => {
    console.log(data);
    if (err) {
      res.status(500).send({
        message: "une erreur est produite",
      });
      return;
    }
    res.status(200).json(data);
  });
};

const getTousArticle = (req, res) => {
  Article.getAllArticle((err, data) => {
    if (err) {
      res.status(500).send({ message: "une erreur est produite" });
      return;
    }
    res.status(200).json(data);
  });
};

const getOneArticle = (req, res) => {
  let id = req.params.id;
  Article.getOneArticle(id, (err, data) => {
    if (data == null) {
      res.status(500).send({ message: "une erreur est produite" });
      return;
    }
    res.status(200).json(data);
  });
};
const deleteArticle = (req, res) => {
  let id = req.params.id;
  Article.deleteArticle(id, (err, data) => {
    if (data == null) {
      res.status(500).send({ message: "une erreur est produite" });
      return;
    }
    res.status(200).json(data);
  });
};

module.exports = {
  ajouterArticle,
  getTousArticle,
  getOneArticle,
  deleteArticle,
};
