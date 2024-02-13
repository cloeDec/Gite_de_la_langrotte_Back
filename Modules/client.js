const express = require("express");
const clientService = require("../Services/clientServices");
const router = express.Router();

// Route vers la page d'accueil
// /Gite/
router.get("/", (req, res) => {
    clientService.fetchClient().then(result => {
        res.status(200)
        res.json(result);
    }).catch(err => {
        console.error("Oops...", err);
        res.json({"message" : "Error" + err.sqlMessage})
    });
});

router.post("/", (req, res) => {
    const client = req.body
    clientService.addClient(client).then(result => {
        console.log(result);
        res.status(200)
        res.json(result.insertId);
    }).catch(err => {
        console.error("Oops...", err);
        res.json({"message" : "Error" + err.sqlMessage})
    });
});

router.delete("/:IDClient", (req, res) => {
    const deleteClient = req.params.IDClient;
    clientService.deleteClientById(deleteClient).then(result => {
        res.status(200)
        res.json(result);
    }).catch(err => {
        console.error("Oops...", err);
        res.json({"message" : "Error" + err.sqlMessage})
    });
});

module.exports = router;