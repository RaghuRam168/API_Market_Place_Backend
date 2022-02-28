const mongoose = require('mongoose')
const loginModel = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    fullname:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model("login",loginModel)
