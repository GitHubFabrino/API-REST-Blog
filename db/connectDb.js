// db.js
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_Blog",
});
var connecter;

connection.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données : ", err);
    return;
  }
  connecter = "ok";
  console.log("Connecté à la base de données MySQL");
});

module.exports = connection;
