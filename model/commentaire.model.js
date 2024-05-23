const db = require("../db/connectDb");
class Commentaire {
  constructor(
    contenu_commentaire,
    id_utilisateur,
    id_article,
    date_commentaire
  ) {
    this.contenu_commentaire = contenu_commentaire;
    this.id_utilisateur = id_utilisateur;
    this.id_article = id_article;
    this.date_commentaire = date_commentaire;
  }

  static createCommentaire(newCommentaire, result) {
    console.log(newCommentaire);
    db.query("INSERT INTO commentaire SET ?", newCommentaire, (err, res) => {
      if (err) {
        console.log("Erreur de la creation commentaire a");
        result(err, err);
        return;
      }
      console.log("commentaire creer : ", {
        id: res.insertId,
        ...newCommentaire,
      });
      result(null, { id: res.insertId, ...newCommentaire });
    });
  }
  static updateUtilisateur() {}

  static async getAllCommentaire(id_article, result) {
    // db.query(
    //   "SELECT * FROM commentaire WHERE id_article = ?",
    //   id_article,
    //   (err, res) => {
    //     if (err) {
    //       console.log("une erreur est produit lors de chargement ");
    //       result(err, null);
    //       return;
    //     }
    //     console.log("Tous  les commentaire");
    //     result(null, res);
    //     return;
    //   }
    // );

    try {
      const [err, commentaire] = await new Promise((resolve, reject) => {
        db.query(
          "SELECT * FROM commentaire WHERE id_article = ?",
          id_article,
          (err, res) => {
            if (err) {
              reject([err, null]);
            } else {
              resolve([null, res]);
            }
          }
        );
      });

      console.log(commentaire);
      const dataCommentaire = await Promise.all(
        commentaire.map(async (comms) => {
          const [err1, utilisateur] = await new Promise((resolve, reject) => {
            db.query(
              "SELECT * FROM utilisateur WHERE id_utilisateur =?",
              comms.id_utilisateur,
              (err, res) => {
                if (err) {
                  reject([err, null]);
                } else {
                  resolve([null, res]);
                }
              }
            );
          });

          console.log(utilisateur[0]);

          return {
            ...comms,
            utilisateur: utilisateur[0].nom,
          };
        })
      );

      console.log(dataCommentaire);
      result(null, dataCommentaire);
    } catch (err) {
      console.log(err);
      result(err, null);
    }
  }

  static getOneCommentaire(id, result) {
    db.query(
      "SELECT * FROM commentaire WHERE id_commentaire = ?",
      id,
      (err, res) => {
        if (err) {
          console.log("une erreur est produit lors de chargement ");
          result(err, null);
          return;
        }

        if (res.length) {
          console.log("commentaire : ", res);
          result(null, res);
          return;
        }
        console.log("commentaire non trouvée");
        result(null, { message: "commentaire non trouvée" });
      }
    );
  }

  static deleteOneCommentaire(id, result) {
    db.query(
      "DELETE FROM commentaire WHERE id_commentaire = ?",
      id,
      (err, res) => {
        if (err) {
          console.log("une erreur est produit lors de chargement ");
          result(err, null);
          return;
        }
        console.log("commentaire Supprimer");
        result(null, { message: "commentaire supprimer avec succée" });
      }
    );
  }
}

module.exports = Commentaire;
