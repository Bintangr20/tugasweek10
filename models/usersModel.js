// usersModel.js
const pool = require("../config/connection");

class User {
  constructor(id, email, password, role) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  static registerUser(id, email, password, role, callback) {
    pool.query(
      "INSERT INTO users (id, email, password, role) VALUES ($1, $2, $3, $4)",
      [id, email, password, role],
      (err, result) => {
        if (err) {
          return callback(err, null);
        }
        callback(null, result);
      }
    );
  }

  static login(email, password, callback) {
    pool.query(
      "SELECT * FROM users WHERE email = $1 AND password = $2",
      [email, password],
      (err, result) => {
        if (err) {
          return callback(err, null);
        }
        if (result.rows.length > 0) {
          const user = new User(
            result.rows[0].id,
            result.rows[0].email,
            result.rows[0].password,
            result.rows[0].role
          );
          callback(null, user);
        } else {
          callback(null, null);
        }
      }
    );
  }

  static getUsersByPage(page, limit, callback) {
    pool.query(
      "SELECT * FROM users ORDER BY id LIMIT $1 OFFSET $2",
      [limit, (page - 1) * limit],
      (err, result) => {
        if (err) {
          return callback(err, null);
        }
        callback(null, result.rows);
      }
    );
  }
}

module.exports = User;
