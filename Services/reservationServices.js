const conn = require("./Database")

const fetchReservation = () => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT c.Nom_Client, c.Prenom_Client, r.Num_reservation, r.Date_debut_resa, r.Date_fin_resa, r.Nb_personnes, r.Statut, g.Nom_Gite,
        DATEDIFF(r.Date_fin_resa, r.Date_debut_resa) AS Nombre_de_Jours,
        DATEDIFF(r.Date_fin_resa, r.Date_debut_resa) * g.Prix_Gite AS Prix_Total
        FROM client c
        INNER JOIN reservation r ON c.Id_Client = r.Id_Client
        INNER JOIN gites g ON r.ID_Gite = g.ID_Gite
        ORDER BY  r.Statut, g.Nom_Gite;`;
        let query = conn.query(sql, (err, result, field) => {
            if(err) return reject(err);
            resolve(result);
        });
    });
}

const addReservation = (client) => {
    return new Promise((resolve, reject) => {
        let sql = `INSERT INTO reservation (Date_debut_resa, Date_fin_resa, Nb_personnes,Statut, Id_Client, ID_Gite) 
        VALUES (?,?,?,?,?,?);
      `;
        let query = conn.query(sql,[client.Date_debut_resa, client.Date_fin_resa, client.Nb_personnes,'En Attente', client.Id_Client, client.ID_Gite], (err, result, field) => {
            if(err) return reject(err);
            resolve(result);
        }); console.log(client.Id_Client);
    });
}

const deleteReservById = (NumReserv) => {
    return new Promise((resolve, reject) => {
        let sql = `DELETE FROM reservation WHERE Num_reservation = ?` ;
        let query = conn.query(sql, [NumReserv],(err, result, field) => {
            if(err) return reject(err);
            resolve(result);
        });
    });
}

const ValidReservById = (reserv) => {
    return new Promise((resolve, reject) => {
        let sql = `UPDATE reservation SET Statut = 'Validée' WHERE Num_reservation = ?` ;
        let query = conn.query(sql, [reserv.Num_reservation],(err, result, field) => {
            if(err) return reject(err);
            resolve(result);
        });
    });
}

const RefusReservById = (reserv) => {
    return new Promise((resolve, reject) => {
        let sql = `UPDATE reservation SET Statut = 'Refusée' WHERE Num_reservation = ?` ;
        let query = conn.query(sql,[reserv.Num_reservation] ,(err, result, field) => {
            if(err) return reject(err);
            resolve(result);
        });
    });
}

module.exports = {
    fetchReservation,
    addReservation,
    deleteReservById,
    ValidReservById,
    RefusReservById
}