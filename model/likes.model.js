const db = require("../db/connectDb");
class Likes {
  constructor(id_utilisateur, id_article) {
    this.id_utilisateur = id_utilisateur;
    this.id_article = id_article;
  }

  static createLike(newLike, result) {
    console.log(newLike);
    db.query("INSERT INTO likes SET ?", newLike, (err, res) => {
      if (err) {
        console.log("Erreur de la creation commentaire a");
        result(err, err);
        return;
      }
      console.log("likes creer : ", {
        id: res.insertId,
        ...newLike,
      });
      result(null, { id: res.insertId, ...newLike });
    });
  }
  static updateUtilisateur() {}

  static getAllLike(id_article, result) {
    db.query(
      "SELECT * FROM likes WHERE id_article = ?",
      id_article,
      (err, res) => {
        if (err) {
          console.log("une erreur est produit lors de chargement ");
          result(err, null);
          return;
        }
        console.log("Tous  les like");
        result(null, res);
        return;
      }
    );
  }
  static getOneLike(id, result) {
    db.query("SELECT * FROM likes WHERE id_likes = ?", id, (err, res) => {
      if (err) {
        console.log("une erreur est produit lors de chargement ");
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("like : ", res);
        result(null, res);
        return;
      }
      console.log("like non trouvée");
      result(null, { message: "like non trouvée" });
    });
  }

  static deleteOneLike(id, result) {
    db.query("DELETE FROM likes WHERE id_likes = ?", id, (err, res) => {
      if (err) {
        console.log("une erreur est produit lors de chargement ");
        result(err, null);
        return;
      }
      console.log("Like Supprimer");
      result(null, { message: "Like supprimer avec succée" });
    });
  }
}

module.exports = Likes;
