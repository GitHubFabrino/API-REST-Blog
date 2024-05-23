const db = require("../db/connectDb");
class Status {
  constructor(nom_status) {
    this.nom_status = nom_status;
  }

  static createStatus(newStatus, result) {
    db.query("INSERT INTO status SET ?", newStatus, (err, res) => {
      if (err) {
        console.log("Erreur de la creation status ");
        result(err, null);
        return;
      }
      console.log("status creer : ", {
        id: res.insertId,
        ...newStatus,
      });
      result(null, { id: res.insertId, ...newStatus });
    });
  }
  static updateStatus(id, result) {}

  static getAllStatus(result) {
    db.query("SELECT * FROM status ", (err, res) => {
      if (err) {
        console.log("une erreur est produit lors de chargement ");
        result(err, null);
        return;
      }
      console.log("Tous  les status");
      result(null, res);
      return;
    });
  }
  static getOneStatus(id, result) {
    db.query("SELECT * FROM status WHERE id_status = ?", id, (err, res) => {
      if (err) {
        console.log("une erreur est produit lors de chargement ");
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("getOnStatus");
        result(null, res);
        return;
      }
      console.log("status non trouvée");
      result(null, { message: "status non trouvée" });
    });
  }
  static deleteStatus(id, result) {
    console.log(id);
    db.query("DELETE FROM status WHERE id_status = ?", id, (err, res) => {
      if (err) {
        console.log("une erreur est produit lors de chargement ");
        result(err, err);
        return;
      }
      console.log("status Supprimer");
      result(null, { message: "status supprimer avec succée" });
    });
  }
}
module.exports = Status;
