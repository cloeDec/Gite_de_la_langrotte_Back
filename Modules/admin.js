const express = require("express");
const adminService = require("../Services/adminServices");
const router = express.Router();

// Route protegé avec le token

router.get("/", (req, res) => {
    adminService.fetchAllGite().then(result => {
        res.status(200)
        res.json(result);
    }).catch(err => {
        console.error("Oops...", err);
        res.json({"message" : "Error" + err.sqlMessage})
    });
});

router.post("/", (req, res) => {
    adminService.addGite(req.body).then(result => {
        res.status(200)
        res.json(result);
    }).catch(err => {
        console.error("Oops...", err);
        res.json({"message" : "Error" + err.sqlMessage})
    });
});

router.delete("/:IDGite", (req, res) => {
    const deleteGite = req.params.IDGite;
    adminService.deleteGiteById(deleteGite).then(result => {
        res.status(200)
        res.json(result);
    }).catch(err => {
        console.error("Oops...", err);
        res.json({"message" : "Error" + err.sqlMessage})
    });
});

router.patch("/", (req, res) => {
    const modifyGite = req.body;
    console.log(modifyGite);
    adminService.modifyGiteById(modifyGite).then(result => {
        console.log(result);
        res.status(200)
        res.json(result);
    }).catch(err => {
        console.error("Oops...", err);
        res.json({"message" : "Error" + err.sqlMessage})
    });
});

router.get("/:IDGite", (req, res) => {
    const patchGite = req.params.IDGite;
    adminService.fetchGiteByID(patchGite).then(result => {
        res.status(200)
        res.json(result);
    }).catch(err => {
        console.error("Oops...", err);
        res.json({"message" : "Error" + err.sqlMessage})
    });
});

module.exports = router;