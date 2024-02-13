const express = require("express");
const equipService = require("../Services/equipementServices");
const router = express.Router();

// Route vers la page d'accueil
// /Gite/

router.get("/:ID_Gite", (req, res) => {
    equipService.fetchEquipementById(req.params.ID_Gite).then(result => {
        res.status(200)
        res.json(result);
    }).catch(err => {
        console.error("Oops...", err);
        res.json({"message" : "Error" + err.sqlMessage})
    });
});


module.exports = router;