const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const usersSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

usersSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      username: this.username,
      _id: this._id,
    },
    "hellokitty",
    {
      expiresIn: "2h",
    }
  );
  return token;
};

module.exports = mongoose.model("User", usersSchema);
