const Status = require("../model/status.model");

const ajouterStatus = (req, res) => {
  const status = new Status(req.body.nom_status);

  Status.createStatus(status, (err, data) => {
    if (err) {
      res.status(500).send({
        message: "une erreur est produite",
      });
      return;
    }
    res.status(200).json(data);
  });
};

const getTousStatus = (req, res) => {
  Status.getAllStatus((err, data) => {
    if (err) {
      res.status(500).send({ message: "une erreur est produite" });
      return;
    }
    res.status(200).json(data);
  });
};

const getOneStatus = (req, res) => {
  let id = req.params.id;
  Status.getOneStatus(id, (err, data) => {
    if (data == null) {
      res.status(500).send({ message: "une erreur est produite" });
      return;
    }
    res.status(200).json(data);
  });
};

const deleteOneStatus = (req, res) => {
  let id = req.params.id;
  Status.deleteStatus(id, (err, data) => {
    if (data == null) {
      res.status(500).send({ message: "une erreur est produite" });
      return;
    }
    res.status(200).json(data);
  });
};

module.exports = {
  ajouterStatus,
  getTousStatus,
  getOneStatus,
  deleteOneStatus,
};
