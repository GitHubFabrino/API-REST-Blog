const db = require("../db/connectDb");
class Categorie {
  constructor(nom_categorie) {
    this.nom_categorie = nom_categorie;
  }

  static createCategorie(newCategorie, result) {
    db.query("INSERT INTO categorie SET ?", newCategorie, (err, res) => {
      if (err) {
        console.log("Erreur de la creation categorie ");
        result(err, null);
        return;
      }
      console.log("categorie creer : ", {
        id: res.insertId,
        ...newCategorie,
      });
      result(null, { id: res.insertId, ...newCategorie });
    });
  }
  static updateCategorie(id, result) {}

  static getAllCategorie(result) {
    db.query("SELECT * FROM categorie ", (err, res) => {
      if (err) {
        console.log("une erreur est produit lors de chargement ");
        result(err, null);
        return;
      }
      console.log("Tous  les categorie");
      result(null, res);
      return;
    });
  }
  // static getOneCategorie(id, result) {
  //   db.query(
  //     "SELECT * FROM categorie WHERE id_categorie = ?",
  //     id,
  //     (err, res) => {
  //       if (err) {
  //         console.log("une erreur est produit lors de chargement ");
  //         result(err, null);
  //         return;
  //       }

  //       if (res.length) {
  //         // console.log("categorie : ", res);
  //         result(null, res[0]);
  //         return;
  //       }
  //       console.log("categorie non trouvée");
  //       result(null, { message: "categorie non trouvée" });
  //     }
  //   );
  // }

  static getOneCategorie(id) {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM categorie WHERE id = ?", id, (err, res) => {
        if (err) {
          console.log("Erreur lors de la récupération de la catégorie :", err);
          reject(err);
          return;
        }
        if (res.length > 0) {
          resolve(res[0]);
        } else {
          resolve(null);
        }
      });
    });
  }

  static deleteCategorie(id, result) {
    console.log(id);
    db.query("DELETE FROM categorie WHERE id_categorie = ?", id, (err, res) => {
      if (err) {
        console.log("une erreur est produit lors de chargement ");
        result(err, err);
        return;
      }
      console.log("categorie Supprimer");
      result(null, { message: "categorie supprimer avec succée" });
    });
  }
}
module.exports = Categorie;
