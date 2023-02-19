const jwt = require("jsonwebtoken");

// optional | secrets should be stored in .env
const secret = "mysecretshh";
const expiration = "2h";

module.exports = {
    // expects user object & adds user's properties to the token
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
