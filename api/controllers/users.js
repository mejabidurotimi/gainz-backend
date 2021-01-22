// Import dependencies
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../models/users");

// (POST) Add new user to database '/api/users'
exports.createUser = (req, res, next) => {
  User.find({ username: req.body.username })
    .exec()
    .then((user) => {
      if (user.length >= 1)
        return res.status(409).json({ message: "Username already exists" });

      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) return throwError(err);

        const user = new User({
          _id: new mongoose.Types.ObjectId(),
          password: hash,
          username: req.body.username,
        });

        user
          .save()
          .then((result) => {
            console.log(result);
            res.status(201).json({ message: "New User Created!", result });
          })
          .catch((e) => throwError(e));
      });
    });
};

// (POST) login user to '/api/users/login'
exports.loginUser = (req, res, next) => {
  User.find({ username: req.body.username })
    .exec()
    .then((user) => {
      if (user.length < 1)
        return res
          .status(401)
          .json({ message: "Username or Password is incorrect" });

      // Compare received password with saved hash
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err)
          return res
            .status(401)
            .json({ message: "Username or password is incorrect" });

        // GET JSON WEB TOKEN
        if (result) {
          const token = user[0].generateAuthToken();
          return res.status(200).json({
            message: "Log in successful",
            token: token,
            username: user[0].username,
            _id: user[0]._id,
          });
        }

        res.status(401).json({ message: "Email or Password is incorrect!" });
      });
    })
    .catch((e) => throwError(e));
};

// (DELETE) account
exports.deleteAccount = (req, res, next) => {
  const userId = req.params.userId;
  User.deleteOne({ _id: userId })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((e) => throwError(e));
};

//Error Function
throwError = (e) => {
  console.log(e);
  res.status(500).json({ error: e });
};
