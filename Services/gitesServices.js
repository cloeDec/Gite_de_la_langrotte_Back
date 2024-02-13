const conn = require("./Database")

const fetchGite = () => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT
        Gites.ID_Gite,
        Gites.Nom_Gite,
        Gites.Nb_Chambre,
        Gites.Nb_Personnes,
        Gites.Prix_Gite,
        Image.url_image
      FROM
        Gites
      INNER JOIN
        image ON Gites.ID_Gite = image.ID_Gite
        WHERE img_principale IS TRUE ;
      `;
        let query = conn.query(sql, (err, result, field) => {
            if(err) return reject(err);
            resolve(result);
        });
    });
}

const fetchGiteById = (ID_Gite) => {
  return new Promise((resolve, reject) => {
      let sql = `SELECT
      Gites.ID_Gite,
      Gites.Nom_Gite,
      Gites.Nb_Chambre,
      Gites.Nb_Personnes,
      Gites.Descriptif_Gite,
      Image.url_image
    FROM
      Gites
    INNER JOIN
      image ON Gites.ID_Gite = image.ID_Gite
    WHERE img_principale IS TRUE 
    AND Gites.ID_Gite=?`;
      let query = conn.query(sql, [ID_Gite],(err, result, field) => {
          if(err) return reject(err);
          resolve(result);
      });
  });
}


module.exports = {
    fetchGite,
    fetchGiteById
}