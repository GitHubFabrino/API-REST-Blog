const express = require("express");
const db = require("./db/connectDb");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");

const routeUtilisateur = require("./route/utilisateur.route");
const routeArticle = require("./route/article.route");
const routeCategorie = require("./route/categorie.route");
const routeCommentaire = require("./route/commentaire.route");
const routeLikes = require("./route/likes.route");
const routeStatus = require("./route/status.route");
const routeSingIn = require("./route/singIn.route");
const path = require("path");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// End Pointe
app.use("/api/v1", routeUtilisateur);
app.use("/api/v2", routeArticle);
app.use("/api/v3", routeCategorie);
app.use("/api/v4", routeCommentaire);
app.use("/api/v5", routeLikes);
app.use("/api/v6", routeStatus);
app.use("/api/v7", routeSingIn);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  console.log("ok");
});

app.listen(3002);
console.log("En attente des requettes");
