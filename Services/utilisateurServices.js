const conn = require("./Database");

const fetchUtilisateur = (utilisateur) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM admin 
      WHERE user_name = ? 
      AND user_mdp = ?; `;
    let query = conn.query(
      sql,
      [utilisateur.user_name, utilisateur.user_mdp],
      (err, result, field) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

const fetchUtilisateurById = (ID_Uti) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT 
    Id_admin, 
    user_name, 
    user_mdp
    FROM
      admin
    WHERE Id_admin=?`;
    let query = conn.query(sql, [ID_Uti], (err, result, field) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const modifyUtiById = (uti) => {
  return new Promise((resolve, reject) => {
    let sql = `UPDATE admin SET user_name = ?, 
    user_mdp = ?
        WHERE Id_admin = ?`;
    let query = conn.query(
      sql,
      [
        uti.user_name,
        uti.user_mdp,
        uti.Id_admin
      ],
      (err, result, field) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

module.exports = {
  fetchUtilisateur,
  fetchUtilisateurById,
  modifyUtiById
};
