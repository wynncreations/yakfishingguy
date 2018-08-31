const express   = require('express');
const router    = express.Router();
const mongoose  = require('mongoose');
const passport  = require("passport");
const User      = require("../models/user");

//Registration page get
router.get("/register",(req,res)=>{
    res.render("register");
});

//Registration page post, register the account to DB and auth user.
router.post("/register",(req,res)=>{
    var newUser = new newUser(req.body.user);
    newUser.posID = "5";
    newUser.email = req.body.user.username;
    
    //look for an existing user and register if no existing user. Redirect if user found.
    User.findOne({email: req.body.user.username},(err,foundUser)=>{
        if(foundUser){
            console.log("user found: ",foundUser);
            res.redirect("/login");
        }
        newUser.save();
        
        passport.authenticate("local",{
            successRedirect: "/",
            failureRedirect: "/register"
        },(req,res)=>{});
    });

});


module.exports = router;