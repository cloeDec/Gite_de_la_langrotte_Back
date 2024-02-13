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

module.exports = {
  fetchUtilisateur,
};
