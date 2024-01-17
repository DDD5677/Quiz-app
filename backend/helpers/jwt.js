const { expressjwt: jwt } = require("express-jwt");
const secret = process.env.secret;
const JWT = require("jsonwebtoken");

function authJwt() {
   const api = process.env.API_URL;
   return jwt({
      secret,
      algorithms: ["HS256"],
   }).unless({
      path: [
         { url: /\/public(.*)/, methods: ["GET", "OPTIONS"] },
         `${api}/users/login`,
         `${api}/users/refresh`,
         `${api}/users/register`,
         `${api}/settings/statistics`,
      ],
   });
}

module.exports = { authJwt };
