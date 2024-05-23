const Likes = require("../model/likes.model");

const ajouterLike = (req, res) => {
  const newLikes = new Likes(req.body.id_utilisateur, req.body.id_article);
  Likes.createLike(newLikes, (err, data) => {
    if (err) {
      res.status(500).send({
        message: "une erreur est produite",
      });
      return;
    }
    res.status(200).json(data);
  });
};

const getTousLike = (req, res) => {
  let id_article = req.params.id_article;
  Likes.getAllLike(id_article, (err, data) => {
    if (err) {
      res.status(500).send({ message: "une erreur est produite" });
      return;
    }
    res.status(200).json(data);
  });
};

const getOneLike = (req, res) => {
  let id = req.params.id;
  Likes.getOneLike(id, (err, data) => {
    if (data == null) {
      res.status(500).send({ message: "une erreur est produite" });
      return;
    }
    res.status(200).json(data);
  });
};

const deleteOneLike = (req, res) => {
  let id = req.params.id;
  Likes.deleteOneLike(id, (err, data) => {
    if (data == null) {
      res.status(500).send({ message: "une erreur est produite" });
      return;
    }
    res.status(200).json(data);
  });
};

module.exports = {
  ajouterLike,
  getTousLike,
  getOneLike,
  deleteOneLike,
};
