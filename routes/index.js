<<<<<<< HEAD
var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var request = require("request");

router.get("/",function(req,res){
    //Get user id
    
    //get media url with id.

    //send media url to the landing page.
    res.render("landing");
});

router.get("/tos", function (req, res) {
    res.render("tos");
});

router.get("/privacy", function (req, res) {
    res.render("privacy");
});



=======
const express   = require('express');
const router    = express.Router();

router.get('/',(req,res) => {
  res.render('landing')
});

>>>>>>> oauth
module.exports = router;