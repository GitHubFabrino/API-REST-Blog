const Utilisateur = require("../model/utilisateur.model");
const Status = require("../model/status.model");
const bcrypt = require("bcrypt");

const signIn = (req, res) => {
  if (!req.body.email || !req.body.mdp) {
    res
      .status(400)
      .send({ message: "L'email et le mot de passe sont requis." });
    return;
  }

  Utilisateur.findByEmailUtilisateur(req.body.email, (err, user) => {
    if (err) {
      console.log(
        "Une erreur s'est produite lors de la recherche de l'utilisateur."
      );
      res.status(500).send({
        message:
          "Une erreur s'est produite lors de la recherche de l'utilisateur.",
      });
      return;
    }

    if (!user) {
      res.status(401).send({ message: "L'utilisateur n'existe pas." });
      return;
    }

    bcrypt.compare(req.body.mdp, user.mdp, (err, result) => {
      if (err) {
        res.status(500).send({
          message:
            "Une erreur s'est produite lors de la comparaison des mots de passe.",
        });
        return;
      }
      if (!result) {
        res.status(401).send({ message: "Mot de passe incorrect." });
        return;
      }

      Utilisateur.findById(user.id_utilisateur, (err, person) => {
        if (err) {
          res.status(500).send({
            message:
              "Une erreur s'est produite lors de la recherche du nom de l'utilisateur.",
          });
          return;
        }

        Status.getOneStatus(person[0].id_status, (err, status) => {
          if (err) {
            res.status(500).send({
              message:
                "Une erreur s'est produite lors de la recherche du nom de l'utilisateur.",
            });
            return;
          }

          res.status(200).send({
            message: "Connexion réussie !",
            user: {
              nom: person[0].nom,
              email: person[0].email,
              id_utilisateur: person[0].id_utilisateur,
              status: status[0].nom_status,
            },
          });
        });
      });
    });
  });
};

module.exports = { signIn };
