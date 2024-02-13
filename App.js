const express = require("express");
const gites = require("./Modules/gites");
const avis = require("./Modules/avis");
const equipement = require("./Modules/equipement");
const image = require("./Modules/image");
const admin = require("./Modules/admin");
const reservation = require("./Modules/reservation");
const client = require("./Modules/client");
const app = express();
const port = 3000;
const cors = require("cors");
const utilisateurService = require("./Services/utilisateurServices");
const jwt = require("jsonwebtoken");
const mailer = require("./Modules/nodeMailer");
const SECRET = "toto";


/* Utilisation de cors */
app.use(cors());

/*Utilisation d'express*/
app.use(express.json());

/* Récupération du header bearer */
const extractBearerToken = (headerValue) => {
  if (typeof headerValue !== "string") {
    return false;
  }
  const matches = headerValue.match(/(bearer)\s+(\S+)/i);
  return matches && matches[2];
};

/* Vérification du token */
const checkTokenMiddleware = (req, res, next) => {
  // Récupération du token
  const token =
    req.headers.authorization && extractBearerToken(req.headers.authorization);
  // Présence d'un token
  if (!token) {
    return res.status(401).json({ message: "Token inexistant" });
  }
  // Véracité du token
  jwt.verify(token, SECRET, (err, decodedToken) => {
    if (err) {
      res.status(401).json({ message: "Error. Mauvais token" });
    } else {
      return next();
    }
  });
};

app.post("/connexion", (req, res) => {
  const data = req.body;
  utilisateurService
    .fetchUtilisateur(data)
    .then((result) => {
      if (result.length > 0) {
        const token = jwt.sign(
          {
            user: result[0],
          },
          SECRET,
          {
            expiresIn: "3 hours",
          }
        );
        res.status(201);
        res.json(token);
      } else {
        res.status(401);
        res.json({ message: "Erreur" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: "Erreur" });
    });
});

app.post("/mail", (req, res) => {
  const data = req.body;
  mailer
    .main(data)
    .then(() => {
      res.json({ message: "Email envoyé!" });
    })
    .catch((e) => {
      console.error(e);
      res.status(500).json({ message: `Erreur : ${e}` });
    });
});

app.use("/admin", admin); // remplacer par = app.use("/admin", checkTokenMiddleware, admin) pour proteger la page

/*Route extraction*/
app.use("/gites", gites);
app.use("/avis", avis);
app.use("/equipement", equipement);
app.use("/image", image);
app.use("/reservation", reservation);
app.use("/client", client);

app.listen(port, () => {
  console.log(`Application à l'écoute sur le port http://127.0.0.1:${port}/ !`);
});
