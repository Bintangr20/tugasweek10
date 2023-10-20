const User = require("../models/usersModel");

class UserRepository {
  static registerUser(id, email, password, role, callback) {
    User.registerUser(id, email, password, role, callback);
  }

  static login(email, password, callback) {
    User.login(email, password, callback);
  }

  static getUsersByPage(page, limit, callback) {
    User.getUsersByPage(page, limit, callback);
  }
}

module.exports = UserRepository;
