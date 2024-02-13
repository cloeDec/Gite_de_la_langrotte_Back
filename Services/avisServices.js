const conn = require("./Database")

const fetchAvis = () => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT Prenom_Client, Avis_Client  
        FROM avis 
        INNER JOIN client ON client.Id_Client = avis.Id_Client 
        WHERE Avis_Client IS NOT NULL ;
      `;
        let query = conn.query(sql, (err, result, field) => {
            if(err) return reject(err);
            resolve(result);
        });
    });
}

module.exports = {
    fetchAvis
}