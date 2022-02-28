const mongoose = require('mongoose')
const imageModel = mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    file:{
        type:Buffer,
        required:true
    }
})

module.exports= mongoose.model('image',imageModel);