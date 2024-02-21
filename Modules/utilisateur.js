const express = require("express");

const utilisateurService = require("../Services/utilisateurServices");
const router = express.Router();

router.get("/", (req, res) => {
  utilisateurService
    .fetchUtilisateur()
    .then((result) => {
      res.status(200);
      res.json(result);
    })
    .catch((err) => {
      console.error("Oops...", err);
      res.json({ message: "Error" + err.sqlMessage });
    });
});

router.get("/:ID_Uti", (req, res) => {
  utilisateurService.fetchUtilisateurById(req.params.ID_Uti).then(result => {
      res.status(200)
      res.json(result[0]);
  }).catch(err => {
      console.error("Oops...", err);
      res.json({"message" : "Error" + err.sqlMessage})
  });
});

module.exports = router;