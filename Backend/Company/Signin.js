// const CryptoJS = require("crypto-js");

// const CompanySignin = class CompanySignin {
//   constructor(connection, req, res) {
//     this.connection = connection;
//     this.req = req;
//     this.res = res;
//   }

//   signin() {
//     this.connection.query(
//       `select id, email, password from companies where email='${this.req.body.email}'`,
//       (err, rows) => {
//         if (err) throw err;

//         let password = "";
//         let id = "";

//         if (rows.length > 0) {
//           rows.forEach(row => {
//             password = row.password;
//             id = row.id;
//           });
//         }

//         const bytes = CryptoJS.AES.decrypt(password.toString(), "secret key 123");
//         const plaintext = bytes.toString(CryptoJS.enc.Utf8);

//         // console.log(plaintext);
//         // console.log(req.body.password);
//         if (plaintext === this.req.body.password) {
//           this.res.cookie("id", id, {
//             maxAge: 3 * 60 * 60 * 1000, // hrs, min, src, msec
//             httpOnly: false,
//             path: "/"
//           });

//           this.res.cookie("user", "company", {
//             maxAge: 3 * 60 * 60 * 1000, // hrs, min, src, msec
//             httpOnly: false,
//             path: "/"
//           });

//           this.res.writeHead(200, {
//             "Content-Type": "text/plain"
//           });

//           this.res.end("Successful Save");
//         } else {
//           this.res.writeHead(400, {
//             "Content-Type": "text/plain"
//           });
//           this.res.end("Incorrect Credentials.");
//         }
//       }
//     );
//   }
// };

// module.exports = {
//   CompanySignin
// };
