const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secureConnection: false,
  auth: {
    user: "decodts.cloe@outlook.fr",
    pass: "CloClo!1011",
  },
  tls: {
    ciphers: "SSLv3",
    rejectUnauthorized: false
  },
});

async function main(mail) {
    console.log(mail);
  const info = await transporter.sendMail({
    from: mail.email + " " + "<decodts.cloe@outlook.fr>",
    to: "decodts.cloe@outlook.fr",
    subject: "Demande d'information",
    text: "Nom : " + mail.nom + "Prénom : " + mail.prenom +"Mail : " + mail.email + "Téléphone : " + mail.tel + "Message : " + mail.message,
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports = { main };
