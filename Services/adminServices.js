const conn = require("./Database");

const fetchAllGite = () => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM gites;`;
    let query = conn.query(sql, (err, result, field) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const fetchGiteByID = (IDGite) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM gites WHERE ID_Gite = ?`;
    let query = conn.query(sql, [IDGite], (err, result, field) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const addGite = (gites) => {
  return new Promise((resolve, reject) => {
    let sql = `INSERT INTO gites (Nom_Gite, Nb_Chambre, Nb_Personnes, Descriptif_Gite, Adresse_Gite, Prix_Gite) 
        VALUES (?,?,?,?,?,?);`;
    let query = conn.query(
      sql,
      [
        gites.Nom_Gite,
        gites.Nb_Chambre,
        gites.Nb_Personnes,
        gites.Descriptif_Gite,
        gites.Adresse_Gite,
        gites.Prix_Gite,
      ],
      (err, result, field) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

const deleteGiteById = (IDGite) => {
  return new Promise((resolve, reject) => {
    let sql = `DELETE FROM gites WHERE ID_Gite =  ?`;
    let query = conn.query(sql, [IDGite], (err, result, field) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const modifyGiteById = (gite) => {
  return new Promise((resolve, reject) => {
    let sql = `UPDATE gites SET Nom_Gite = ?, 
        Nb_Chambre = ?, Nb_Personnes = ? ,
        Descriptif_Gite = ?, Adresse_Gite = ?, Prix_Gite = ?
        WHERE ID_Gite = ?`;
    let query = conn.query(
      sql,
      [
        gite.Nom_Gite,
        gite.Nb_Chambre,
        gite.Nb_Personnes,
        gite.Descriptif_Gite,
        gite.Adresse_Gite,
        gite.Prix_Gite,
        gite.ID_Gite,
      ],
      (err, result, field) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

module.exports = {
  fetchAllGite,
  addGite,
  deleteGiteById,
  fetchGiteByID,
  modifyGiteById,
};
