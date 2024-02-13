const conn = require("./Database");

const fetchClient = () => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM client;`;
    let query = conn.query(sql, (err, result, field) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const addClient = (client) => {
  return new Promise((resolve, reject) => {
    let sql = `INSERT INTO client (Nom_Client, Prenom_Client, Mail_Client, Tel_Client, Adresse_Client, Code_Postal_Client, Ville_Client) 
        VALUES (?,?,?,?,?,?,?);
      `;
    let query = conn.query(
      sql,
      [
        client.Nom_Client,
        client.Prenom_Client,
        client.Mail_Client,
        client.Tel_Client,
        client.Adresse_Client,
        client.Code_Postal_Client,
        client.Ville_Client,
      ],
      (err, result, field) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

const deleteClientById = (IDClient) => {
  return new Promise((resolve, reject) => {
    let sql = `DELETE FROM client WHERE Id_Client = ?` ;
    let query = conn.query(sql,[IDClient], (err, result, field) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  fetchClient,
  addClient,
  deleteClientById,
};
