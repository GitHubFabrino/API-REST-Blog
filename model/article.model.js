const db = require("../db/connectDb");
const Categorie = require("../model/categorie.model");
const Utilisateur = require("../model/utilisateur.model");
const Like = require("../model/likes.model");
const DataArticle = require("../service");

class Article {
  constructor(
    titre,
    contenu,
    date_publication,
    id_categorie,
    id_utilisateur,
    image
  ) {
    this.titre = titre;
    this.contenu = contenu;
    this.date_publication = date_publication;
    this.id_categorie = id_categorie;
    this.id_utilisateur = id_utilisateur;
    this.image = image;
  }

  static createArticle(newArticle, result) {
    const article = new Article(
      newArticle.titre,
      newArticle.contenu,
      newArticle.date_publication,
      newArticle.id_categorie,
      newArticle.id_utilisateur,
      newArticle.image
    );
    console.log(article);

    db.query("INSERT INTO article SET ?", article, (err, res) => {
      if (err) {
        console.log("Erreur de la creation d'Article ");
        result(err, null);
        return;
      }
      console.log("Article creer : ", {
        id: res.insertId,
        ...article,
      });
      result(null, { id: res.insertId, ...article });
    });
  }
  static updateArticle() {}
  static deleteArticle(id, result) {
    db.query("DELETE FROM article WHERE id_article = ?", id, (err, res) => {
      if (err) {
        console.log("une erreur est produit lors de chargement ");
        result(err, null);
        return;
      }
      console.log("Article Supprimer");
      result(null, { message: "Article supprimer avec succée" });
    });
  }

  static getOneArticle(id, result) {
    db.query("SELECT * FROM article WHERE id_article = ?", id, (err, res) => {
      if (err) {
        console.log("une erreur est produit lors de chargement ");
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Article : ", res);
        result(null, res);
        return;
      }
      console.log("Article non trouvée");
      result(null, { message: "Article non trouvée" });
    });
  }
  // static getAllArticle(result) {
  //   db.query("SELECT * FROM article ", (err, res) => {
  //     if (err) {
  //       console.log("une erreur est produit lors de chargement ");
  //       result(err, null);
  //       return;
  //     }
  //     var data = [];
  //     var nomCategorie;
  //     var auteur;
  //     var titre;
  //     var date;
  //     var contenu;
  //     var nbLike;

  //     console.log("Tous  les Articles");
  //     console.log(res.length);
  //     for (let i = 0; i < res.length; i++) {
  //       console.log(res[i].id_categorie);
  //       titre = res[i].titre;
  //       date = res[i].date_publication;
  //       contenu = res[i].contenu;
  //       Categorie.getOneCategorie(res[i].id_categorie, (err, data) => {
  //         if (data == null) {
  //           res.status(500).send({ message: "une erreur est produite" });
  //           return;
  //         }
  //       });
  //     }

  //     console.log(data);

  //     result(null, data);
  //     return;
  //   });
  // }

  // static getAllArticle(result) {
  //   db.query("SELECT * FROM article", (err, res) => {
  //     if (err) {
  //       console.log("une erreur est produite lors de chargement ");
  //       result(err, null);
  //       return;
  //     }
  //     console.log(res);

  //     var dataPromises = res.map((article) => {
  //       return new Promise((resolve, reject) => {
  //         var articleData = {
  //           titre: article.titre,
  //           date: article.date_publication,
  //           contenu: article.contenu,
  //           id_categorie: article.id_categorie,
  //         };

  //         var categorie = Categorie.getOneCategorie(
  //           article.id_categorie,
  //           (err, categorieData) => {
  //             if (err) {
  //               reject(
  //                 "une erreur est produite lors de la récupération de la catégorie"
  //               );
  //               return;
  //             }

  //             console.log(categorieData);

  //             if (categorieData) {
  //               articleData.nomCategorie = categorieData.nom;
  //             }

  //             resolve(articleData);
  //           }
  //         );

  //         console.log(categorie);
  //       });
  //     });

  //     Promise.all(dataPromises)
  //       .then((data) => {
  //         console.log("Tous les Articles");
  //         console.log(data);
  //         result(null, data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         result(err, null);
  //       });
  //   });
  // }

  static async getAllArticle(result) {
    try {
      const [err, res] = await new Promise((resolve, reject) => {
        db.query("SELECT * FROM article", (err, res) => {
          if (err) {
            reject([err, null]);
          } else {
            resolve([null, res]);
          }
        });
      });

      // console.log("aaaaaaaaaaa", res);

      if (err) {
        console.log("une erreur est produite lors de chargement ");
        result(err, null);
        return;
      }

      // Récupérer les catégories pour chaque article
      const datarArticle = await Promise.all(
        res.map(async (article) => {
          const [err, categorie] = await new Promise((resolve, reject) => {
            db.query(
              "SELECT * FROM categorie WHERE id_categorie =?",
              article.id_categorie,
              (err, res) => {
                if (err) {
                  reject([err, null]);
                } else {
                  resolve([null, res]);
                }
              }
            );
          });

          const [err1, utilisateur] = await new Promise((resolve, reject) => {
            db.query(
              "SELECT * FROM utilisateur WHERE id_utilisateur =?",
              article.id_utilisateur,
              (err, res) => {
                if (err) {
                  reject([err, null]);
                } else {
                  resolve([null, res]);
                }
              }
            );
          });

          const [err2, like] = await new Promise((resolve, reject) => {
            db.query(
              "SELECT * FROM likes WHERE id_article =?",
              article.id_article,
              (err, res) => {
                if (err) {
                  reject([err, null]);
                } else {
                  resolve([null, res]);
                }
              }
            );
          });

          if (err || err1 || err2) {
            throw err || err1 || err2;
          }

          return {
            ...article,
            categorie: categorie[0].nom_categorie,
            utilisateur: utilisateur[0].nom,
            nbLike: like.length,
            // On suppose que la requête retourne une seule catégorie
          };
        })
      );
      console.log("Tous les articles");
      result(null, datarArticle);
    } catch (err) {
      console.log(err);
      result(err, null);
    }
  }
}

module.exports = Article;
