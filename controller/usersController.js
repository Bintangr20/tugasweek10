const UserRepository = require("../repositories/usersRepository");

exports.registerUser = (req, res) => {
  const { id, email, password, role } = req.body;

  UserRepository.registerUser(id, email, password, role, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }
    res.status(201).json({ message: "User registered successfully" });
  });
};

exports.login = (req, res) => {
    const { email, password } = req.body;
  
    UserRepository.login(email, password, (err, user) => {
      if (err) {
        return res.status(500).json({ message: "Database error" });
      }
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      res.status(200).json({ message: "Login successful" });
    });
  };

exports.getUsersByPage = (req, res) => {
  const { page, limit } = req.query;

  UserRepository.getUsersByPage(page, limit, (err, users) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }
    res.status(200).json(users);
  });
};

