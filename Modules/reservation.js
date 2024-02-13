const express = require("express");
const reservationService = require("../Services/reservationServices");
const router = express.Router();

// Route vers la page d'accueil
// /Gite/
router.get("/", (req, res) => {
    reservationService.fetchReservation().then(result => {
        res.status(200)
        res.json(result);
    }).catch(err => {
        console.error("Oops...", err);
        res.json({"message" : "Error" + err.sqlMessage})
    });
});



router.post("/", (req, res) => {
    const  reserv  = req.body;
    reservationService.addReservation(reserv).then(result => {
        res.status(200)
        res.json(result);
    }).catch(err => {
        console.error("Oops...", err);
        res.json({"message" : "Error" + err.sqlMessage})
    });
});


router.delete("/:Numreserv", (req, res) => {
    const deleteReserv = req.params.Numreserv;
    reservationService.deleteReservById(deleteReserv).then(result => {
        res.status(200)
        res.json(result);
    }).catch(err => {
        console.error("Oops...", err);
        res.json({"message" : "Error" + err.sqlMessage})
    });
});

router.patch("/", (req, res) => {
    const validReserv = req.body;
    console.log(validReserv);
    reservationService.ValidReservById(validReserv).then(result => {
        console.log(result);
        res.status(200)
        res.json(result);
    }).catch(err => {
        console.error("Oops...", err);
        res.json({"message" : "Error" + err.sqlMessage})
    });
});

router.patch("/refus", (req, res) => {
    const refusReserv = req.body;
    console.log(refusReserv);
    reservationService.RefusReservById(refusReserv).then(result => {
        console.log(result);
        res.status(200)
        res.json(result);
    }).catch(err => {
        console.error("Oops...", err);
        res.json({"message" : "Error" + err.sqlMessage})
    });
});

module.exports = router;