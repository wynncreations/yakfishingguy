var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/",function(req,res){
    res.render("landing");
});

router.get("/tos", function (req, res) {
    res.render("tos");
});

router.get("/privacy", function (req, res) {
    res.render("privacy");
});



module.exports = router;