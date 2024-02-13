const conn = require("./Database")

const fetchEquipementById = (ID_Gite) => {
  return new Promise((resolve, reject) => {
      let sql = `SELECT
      Gites.ID_Gite,
      Appartient.Id_Equipement,
      Equipement.Nom_Equipement
    FROM
      Gites
    INNER JOIN
      Appartient ON Gites.ID_Gite = Appartient.ID_Gite
    INNER JOIN
      Equipement ON Appartient.Id_Equipement = Equipement.Id_Equipement 
    WHERE Gites.ID_Gite=?`;
      let query = conn.query(sql, [ID_Gite],(err, result, field) => {
          if(err) return reject(err);
          resolve(result);
      });
  });
}

module.exports = {
    fetchEquipementById
}