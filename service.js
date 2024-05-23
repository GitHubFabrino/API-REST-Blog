class DataArticle {
  constructor(categorie, auteur, titre, date, contenu, nbLike) {
    this.categorie = categorie;
    this.auteur = auteur;
    this.titre = titre;
    this.date = date;
    this.contenu = contenu;
    this.nbLike = nbLike;
  }
}

module.exports = DataArticle;
