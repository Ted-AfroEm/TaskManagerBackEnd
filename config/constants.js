const dotenv = require("dotenv");

dotenv.config();

const DB_CONNECT = process.env.DB_CONNECT;
const TOKEN_SECRET = process.env.TOKEN_SECRET;

module.exports = {
  DB_CONNECT,
  TOKEN_SECRET,
};
