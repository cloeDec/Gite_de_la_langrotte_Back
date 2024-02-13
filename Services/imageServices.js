const conn = require("./Database")

const fetchImageById = (ID_Gite) => {
  return new Promise((resolve, reject) => {
      let sql = `SELECT
      Gites.ID_Gite,
      Image.url_image
    FROM
      Gites
    INNER JOIN
      Image ON Gites.ID_Gite = Image.ID_Gite
    WHERE Gites.ID_Gite=?
    AND img_principale IS FALSE `;
      let query = conn.query(sql, [ID_Gite],(err, result, field) => {
          if(err) return reject(err);
          resolve(result);
      });
  });
}

const addImage = (img) => {
  return new Promise((resolve, reject) => {
      let sql = `INSERT INTO image ( url_image, img_principale, ID_Gite) 
      VALUES (?, ?, ?);`;
      let query = conn.query(sql,["../Assets/"+img.url_image, img.img_principale, img.ID_Gite] ,(err, result, field) => {
          if(err) return reject(err);
          resolve(result);
      });
  });
}

module.exports = {
    fetchImageById,
    addImage
}