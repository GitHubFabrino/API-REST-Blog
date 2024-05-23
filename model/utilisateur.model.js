const db = require("../db/connectDb");

class Utilisateur {
  constructor(nom, email, mdp, date_creation, id_status) {
    this.nom = nom;
    this.email = email;
    this.mdp = mdp;
    this.date_creation = date_creation;
    this.id_status = id_status;
  }

  static createUtilisateur(newUtilisateur, result) {
    const date = new Date();
    let option = { year: "numeric", month: "2-digit", day: "2-digit" };
    let formateDate = new Intl.DateTimeFormat("fr-FR", option).format(date);

    const utilisateur1 = new Utilisateur(
      newUtilisateur.nom,
      newUtilisateur.email,
      newUtilisateur.mdp,
      formateDate,
      2
    );

    db.query(
      "SELECT * FROM utilisateur WHERE nom = ? ",
      newUtilisateur.nom,
      (err, res) => {
        if (err) {
          console.log("une erreur est produit lors de chargement ");
          result(err, null);
          return;
        }
        if (res.length > 0) {
          console.log("Utilisateur existe ");
          result(null, { message: "Le nom est déjà pris " });
          return;
        } else {
          console.log("Nouveau utilisateur");

          db.query(
            "SELECT * FROM utilisateur WHERE email = ? ",
            newUtilisateur.email,
            (err, res) => {
              if (err) {
                console.log("une erreur est produit lors de chargement ");
                result(err, null);
                return;
              }
              if (res.length > 0) {
                console.log("Email Utilisateur existe ");
                result(null, { message: "L'email est déjà pris " });
                return;
              }

              db.query(
                "INSERT INTO utilisateur SET ?",
                utilisateur1,
                (err, res) => {
                  if (err) {
                    console.log("Erreur de la creation Utilisateur ");
                    result(err, null);
                    return;
                  }
                  console.log("Utilisateur creer : ", {
                    id: res.insertId,
                    ...utilisateur1,
                  });
                  result(null, { id: res.insertId, ...utilisateur1 });
                }
              );
            }
          );
        }
      }
    );
  }
  static updateUtilisateur() {}

  static getAllUtilisateur(result) {
    db.query("SELECT * FROM utilisateur ", (err, res) => {
      if (err) {
        console.log("une erreur est produit lors de chargement ");
        result(err, null);
        return;
      }
      console.log("Tous  les utilisateur");
      result(null, res);
      return;
    });
  }
  static getOnUtilisateur(id, result) {
    db.query(
      "SELECT * FROM utilisateur WHERE id_utilisateur = ?",
      id,
      (err, res) => {
        if (err) {
          console.log("une erreur est produit lors de chargement ");
          result(err, null);
          return;
        }

        if (res.length) {
          console.log("Utilisateur : ", res);
          result(null, res);
          return;
        }
        console.log("Utilisateur non trouvée");
        result(null, { message: "Utilisateur non trouvée" });
      }
    );
  }

  static deleteOnUtilisateur(id, result) {
    db.query(
      "DELETE FROM utilisateur WHERE id_utilisateur = ?",
      id,
      (err, res) => {
        if (err) {
          console.log("une erreur est produit lors de chargement ");
          result(err, null);
          return;
        }
        console.log("Utilisateur Supprimer");
        result(null, { message: "Utilisateur supprimer avec succée" });
      }
    );
  }

  static findByEmailUtilisateur(email, result) {
    console.log("email : ", email);
    db.query("SELECT * FROM utilisateur WHERE email = ?", email, (err, res) => {
      if (err) {
        console.log("une erreur est produit lors de chargement ");
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("FindByEmailUtilisateur Utilisateur");
        result(null, res[0]);
        return;
      }
      console.log("Utilisateur non trouvée");
      result(null, { message: "Utilisateur non trouvée" });
    });
  }

  static findById(id, result) {
    db.query(
      "SELECT * FROM utilisateur WHERE id_utilisateur = ?",
      id,
      (err, res) => {
        if (err) {
          console.log("une erreur est produit lors de chargement ");
          result(err, null);
          return;
        }

        if (res.length) {
          console.log(" findById Utilisateur ");
          result(null, res);
          return;
        }
        console.log("Utilisateur non trouvée");
        result(null, { message: "Utilisateur non trouvée" });
      }
    );
  }
}

module.exports = Utilisateur;
