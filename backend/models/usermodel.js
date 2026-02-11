 const mongoose = require("mongoose");

 const  userSchema =  new  mongoose.Schema({
    
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
 },{ timestamps :true })


  const user = mongoose.model("User", userSchema);

  module.exports = user