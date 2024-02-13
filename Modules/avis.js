const express = require("express");
const avisService = require("../Services/avisServices");
const router = express.Router();

// Route vers la page d'accueil
// /avis/
router.get("/", (req, res) => {
    avisService.fetchAvis().then(result => {
        res.status(200)
        res.json(result);
    }).catch(err => {
        console.error("Oops...", err);
        res.json({"message" : "Error" + err.sqlMessage})
    });
});

module.exports = router;