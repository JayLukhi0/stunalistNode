const mongoose = require('mongoose');

const quoteSchema = mongoose.Schema({
    uname:{
        type:String,
        required:true
    },
    quote:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model("Quote",quoteSchema);