const express = require("express");
const imageService = require("../Services/imageServices");
const router = express.Router();

// Route vers la page d'accueil
// /Gite/

router.get("/:ID_Gite", (req, res) => {
    imageService.fetchImageById(req.params.ID_Gite).then(result => {
        res.status(200)
        res.json(result);
    }).catch(err => {
        console.error("Oops...", err);
        res.json({"message" : "Error" + err.sqlMessage})
    });
});

router.post("/", (req, res) => {
    imageService.addImage(req.body).then(result => {
        res.status(200)
        res.json(result);
    }).catch(err => {
        console.error("Oops...", err);
        res.json({"message" : "Error" + err.sqlMessage})
    });
});



module.exports = router;