require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const route = require('./route/routes');


// mongoose.connect("mongodb://localhost:27017/stunalist",{useNewUrlParser:true,useUnifiedTopology:true}).then(
mongoose.connect(process.env.DATABASE,{useNewUrlParser:true,useUnifiedTopology:true}).then(
        ()=>{
        const app = express();
        app.use(cors());
        PORT = process.env.PORT || 3000;
        app.use(bodyParser.urlencoded({extended:true}));
        app.use(express.json());
        app.use('/api',route);


        app.listen(PORT,()=>{
            console.log("Server started------------>",PORT);
        })
    }
)