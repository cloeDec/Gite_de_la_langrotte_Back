const express = require("express");
const giteService = require("../Services/gitesServices");
const router = express.Router();

// Route vers la page d'accueil
// /Gite/
router.get("/", (req, res) => {
    giteService.fetchGite().then(result => {
        res.status(200)
        res.json(result);
    }).catch(err => {
        console.error("Oops...", err);
        res.json({"message" : "Error" + err.sqlMessage})
    });
});

router.get("/:ID_Gite", (req, res) => {
    giteService.fetchGiteById(req.params.ID_Gite).then(result => {
        res.status(200)
        res.json(result[0]);
    }).catch(err => {
        console.error("Oops...", err);
        res.json({"message" : "Error" + err.sqlMessage})
    });
});


module.exports = router;