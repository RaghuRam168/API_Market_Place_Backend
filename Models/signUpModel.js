const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const user = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// user.methods.matchPassword = async (enteredPassword) =>{
//   return await bcrypt.compare(enteredPassword,this.password)
// }

module.exports = mongoose.model("signUp", user);
