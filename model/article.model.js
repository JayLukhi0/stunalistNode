const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    uname:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model("Article",articleSchema);