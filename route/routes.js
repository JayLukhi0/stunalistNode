const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../model/user.model');
const Quote = require('../model/quote.model');
const Article = require('../model/article.model');
const jwt = require('jsonwebtoken');
const auth = require('../verifyToken');
const router = express.Router();


//For Users
router.get("/user",async(req,res)=>{
    const user = await User.find();
    res.send(user);
});

router.post("/register",async(req,res)=>{

    const salt = await bcrypt.genSalt(10);
    const hashePswd = await bcrypt.hash(req.body.pswd,salt);
    const user = new User({
        uname:req.body.uname,
        email:req.body.email,
        pswd : hashePswd
    });
    await user.save();
    res.send(user);
});

router.post("/login",async(req,res)=>{
    const user =await User.findOne({email:req.body.email});
    msg="";
    if(!user){
        msg="User not exist";
        return res.send({msg});
    }
    else{
        const isValid = await bcrypt.compare(req.body.pswd,user.pswd);
        if (!isValid) {
            msg="Password is not correct.......";
            res.send({msg});
        } else {
            // res.send("Login Successfull....");
            const token =await jwt.sign({_id:user._id},process.env.SECRET_KEY);
            res.send({token,user:user.uname,msg});
            // res.header("auth-token",token);
        }
    }
});

//For articles
router.get('/showarticle',auth,async(req,res)=>{
    try {
        const article = await Article.find();
        res.send(article);
    } catch (error) {
        res.send(error);
    }
});

router.post('/addarticle',auth,async(req,res)=>{
    try {
        const article = new Article({
            uname:req.body.uname,
            title:req.body.title,
            desc:req.body.desc
        })
        await article.save();
        res.send(article);
    } catch (error) {
        res.status(404).send(error);
    }
});


//For Quotes
router.get('/showquote',auth,async(req,res)=>{
    try {
        const quote = await Quote.find();
        res.send(quote);
    } catch (error) {
        res.send(error);
    }
});

router.post('/addquote',auth,async(req,res)=>{
    try {
        const qoute = new Quote({
            uname:req.body.uname,
            quote:req.body.quote,
            author:req.body.author
        })
        await qoute.save();
        res.send(qoute);
    } catch (error) {
        res.status(404).send(error);
    }
});



module.exports = router;