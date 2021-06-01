const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    uname:{
        type:String,
        required:true,
        unique:[true,"User already exists"]
    },
    email:{
        type:String,
        required:true,
    },
    pswd:{
        type:String,
        required:true,
    }
});

module.exports = mongoose.model("User",userSchema);