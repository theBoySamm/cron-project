const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  age: {
    type: Number,
    min: [6, 'Age below minimum age'],
    max: 120
  },
});

const User = mongoose.model("user", UserSchema);

module.exports = User;






